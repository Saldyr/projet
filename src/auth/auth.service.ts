import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens, TokenTypeEnum } from 'prisma/generated/prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { TokensServices } from 'src/tokens/tokens.services';
import { HashService } from 'src/hash/hash.service';
import {
  AuthenticatedUser,
  formatAuthUser,
} from 'src/common/utils/formatAuthUser.util';

@Injectable()
export class AuthService {
  //injection de dépendances
  constructor(
    private jwt: JwtService, // Service JWT utilisé pour créer et vérifier les tokens d'authentification
    private userService: UsersService,
    private tokenService: TokensServices,
    private hashservice: HashService,
  ) {}

  // ===============================
  //        GENERATE ACCESS TOKEN
  // ===============================

  async generateJWTs(
    payload: Record<string, string | number>, // payload = données embarquées dans le JWT sub = id (number) et email = string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // On attend un objet contenant les 2 JWT générés
    const accessToken = await this.jwt.signAsync(payload, {
      // Génération du token d'accès
      expiresIn: process.env.JWT_ACCESS_EXP as any, // Options des tokens générés ici on dit que la validité du token est de 1 jours
      algorithm: process.env.JWT_ALGO as any, // Algorithme de signature du JWT
      secret: process.env.JWT_ACCESS_SECRET, // Secret utilisé pour signer le JWT
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      algorithm: process.env.JWT_ALGO as any,
      secret: process.env.JWT_REFRESH_SECRET, // Secret différent du access token pour séparer les responsabilités de sécurité
      expiresIn: process.env.JWT_REFRESH_EXP as any, // Durée plus longue que access token
    });

    return {
      accessToken,
      refreshToken,
    }; // on retourne les 2 JWT
  }

  // ===============================
  //        REFRESH TOKEN
  // ===============================
  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // On verifie la signature du JWT en décodant le payload
    const payload = await this.jwt.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    console.log('🚀 ~ AuthService ~ refresh ~ payload:', payload);

    // On vérifie en BDD si il existe ? pas expiré ? pas révoqué
    await this.tokenService.verifyTokenOrThrow(refreshToken);
    console.log(
      '🚀 ~ AuthService ~ refresh ~ tokenService.verifyTokenOrThrow:',
      this.tokenService.verifyTokenOrThrow,
    );

    // Ici on revoke le refreshToken actuel pour empêcher la réutilisation
    await this.tokenService.revokeTokenOrThrow(refreshToken);
    console.log(
      '🚀 ~ AuthService ~ refresh ~ tokenService.revokeTokenOrThrow:',
      this.tokenService.revokeTokenOrThrow,
    );

    // On génère un nouveau refreshToken à partir des données contenues dans le payload
    const tokens = await this.generateJWTs({
      sub: payload.sub,
      email: payload.email,
    });
    console.log('🚀 ~ AuthService ~ refresh ~ tokens:', tokens);

    // on calcul la nouvelle date d'expiration
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.JWT_REFRESH_MAX_AGE) * 24 * 60 * 60 * 1000,
    );
    console.log('🚀 ~ AuthService ~ refresh ~ expiresAt:', expiresAt);

    // On sauvegarde la nouvelle paire de token
    await this.tokenService.saveTokens(
      // <-------------------------------------------------todo update
      payload.sub, // utilisateur propriétaire du token
      TokenTypeEnum.REFRESH,
      tokens.refreshToken, // nouveau refresh token JWT
      'unknown', // appareil/navigateur du client
      expiresAt, // date expiration du token
    );
    return tokens; // On retourne les nouveaux JWT au client
  }

  // ===============================
  //        REGISTER
  // ===============================

  async register(
    data: CreateUserDto,
    userAgent: string,
  ): Promise<{
    // Données envoyées par le client pour l'inscription
    user: AuthenticatedUser; // utilisateur renvoyé sans les champs OMIT
    generateTokens: {
      // JWT générés après inscription
      accessToken: string; // token pour accéder aux routes
      refreshToken: string; // token long pour régénérer un access token
    };
    savedTokens: Tokens; // Refresh token sauvegardé en base
  }> {
    // Vérifie si l'email est déjà utilisé en BDD
    // Si oui → on bloque l'inscription
    if (await this.userService.countOneByEmail(data.email)) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    // Hash le mot de passe pour le sécuriser avant stockage (JAMAIS CLAIR)
    const hashedPassword = await this.hashservice.hash(data.password);

    // Crée l'utilisateur en base avec le mot de passe hashé
    const user = await this.userService.createUser(data, hashedPassword);

    // Crée les données qui seront stockées dans le JWT
    const payload = { sub: user.id, email: user.email };

    //Génère access + refresh token
    const generateTokens = await this.generateJWTs(payload);

    const expiresAt = new Date( // Calcule la date d'expiration du refresh token
      Date.now() + // Date d'aujourd'hui en ms
        Number(process.env.JWT_REFRESH_MAX_AGE) * 24 * 60 * 60 * 1000, // + 7 jours
    );

    const savedTokens = await this.tokenService.saveTokens(
      // Sauvegarde le refresh token en base
      user.id, // Propriétaire du token
      TokenTypeEnum.REFRESH, // Type refresh token utilisé pour régénérer un access token
      generateTokens.refreshToken, // Valeur réelle du refresh token JWT généré précédemment
      userAgent, // Informations sur l'appareil du client || utile pour afficher les sessions actives
      expiresAt, // Date d'expiration du token stockée en base
    );

    // Retourne les données utiles après inscription
    return { user, generateTokens, savedTokens };
  }

  // ===============================
  //        LOGIN
  // ===============================

  async login(
    // Données envoyées par le client
    login: LoginDTO,
    // on attend un objet login de type LoginDTO (email, password)
    userAgent: string,
  ): Promise<{
    // on attend une promesse d'un objet avec un user et un token
    user: AuthenticatedUser; // Utilisateur authentifié
    generateTokens: { accessToken: string; refreshToken: string }; // JWT générés après connexion
    savedTokens: Tokens;
  }> {
    const { email, password } = login; // on récupère l'email et le password envoyé par le client (Postman/front/etc.)
    const user = await this.userService.findByEmailOrThrow(email); // On cherche l'user en bdd par son email et on le stock sinon erreur

    const expiresAt = new Date( // Calcule la date d'expiration du refresh token
      Date.now() + // Date d'aujourd'hui en ms
        Number(process.env.JWT_REFRESH_MAX_AGE) * 24 * 60 * 60 * 1000, // + 7 jours
    );

    const payload = { sub: user.id, email: user.email };

    //Génère access + refresh token
    const generateTokens = await this.generateJWTs(payload);

    await this.hashservice.compareHashOrThrow(password, user.password); // on compare le mot de passe envoyé et celui en bdd

    const savedTokens = await this.tokenService.saveTokens(
      // Sauvegarde le refresh token en base
      user.id, // Propriétaire du token
      TokenTypeEnum.REFRESH, // Type refresh token utilisé pour régénérer un access token
      generateTokens.refreshToken, // Valeur réelle du refresh token JWT généré précédemment
      userAgent, // Informations sur l'appareil du client || utile pour afficher les sessions actives
      expiresAt, // Date d'expiration du token stockée en base
    );

    const authUser = formatAuthUser(user); //On garde les infos utiles du user authentifié

    return { user: authUser, generateTokens, savedTokens };
  }

  // ==========================================
  //          LOGOUT
  // ==========================================
  async logout(revoke: string): Promise<void> {
    // Si aucun token présent (déjà déconnecté), on déconnecte sans erreur
    if (!revoke) return;
    // Invalide le refresh token en BDD via revokedAt pour empêcher tout renouvellement de session
    await this.tokenService.revokeTokenOrThrow(revoke);
  }
}
