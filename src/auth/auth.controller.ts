import {
  Body,
  Controller,
  //Get,
  Post,
  Req,
  Res,
  //UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'prisma/generated/prisma/client';
//import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  // Injection de dépendance (ici du Auth Service)
  // Pour utiliser la logique métier d'authentification
  constructor(private readonly authService: AuthService) {}

  // ===============================
  //        REGISTER
  // ===============================

  @Post('register')
  async register(
    @Body() body: CreateUserDto, // Récupère les données envoyées dans le body de la requête
    @Req() req: Request, // Récupère la requête HTTP complète --> Sert ici à récupérer le user-agent du client
    @Res({ passthrough: true }) res: Response, // Permet de modifier la réponse HTTP et passthrough de retourner une réponse
  ): Promise<{
    user: Omit<Users, 'createdAt' | 'updatedAt' | 'password'>;
    accessToken: string;
  }> {
    const result = await this.authService.register(
      // Logique métier hash password / vérif email / register / génération de token / save token
      body, // données utilisateur
      req.headers['user-agent'] || 'unknown',
      // User-Agent = navigateur/appareil du client (Chrome, Postman, mobile…)
      // fallback(valeur de secours) "unknown" si absent
    );
    // Extraction des JWT générés dans AuthService
    const { accessToken, refreshToken } = result.generateTokens;

    res.cookie('refresh_token', refreshToken, {
      // // Création du cookie HTTP contenant le refresh token
      httpOnly: true, // Cookie inaccessible côté JavaScript navigateur (protection contre le vol via XSS)
      sameSite: 'lax', // Protection CSRF modérée
      // secure: process.env.NODE_ENV === 'production', // Empêche l'envoi du cookie en HTTP non sécurisé
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 24 * 60 * 60 * 1000, // Durée de vie du cookie
    });
    return { user: result.user, accessToken: accessToken }; // Retour envoyé au client
    // Le refresh token n'est PAS envoyé dans le JSON
    // Il est stocké uniquement dans le cookie HTTPOnly
  }

  // ===============================
  //        LOGIN
  // ===============================

  @Post('login')
  async login(
    @Body() body: LoginDTO, // Données envoyées par le client
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, // Objet réponse HTTP
  ): Promise<{
    user: Omit<Users, 'createdAt' | 'updatedAt' | 'password'>;
    accessToken: string;
  }> {
    const result = await this.authService.login(
      body,
      req.headers['user-agent'] || 'unknown',
    ); // Appel du service d'authentification pour vérifier email / MDP puis genère les JWTs

    const { accessToken, refreshToken } = result.generateTokens;
    // Extraction des tokens générés

    res.cookie('refresh_token', refreshToken, {
      // Sauvegarde du refresh token dans un cookie sécurisé
      httpOnly: true, // Le cookie ne sera pas accessible via JavaScript
      secure: false, // true en production HTTPS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      sameSite: 'lax', // Protection CSRF
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 24 * 60 * 60 * 1000, // Durée de vie du cookie (Important même durée que le RefreshToken)
    });

    return {
      // Retour utilisateur + access token || Le refresh est uniquement dans le cookie
      user: result.user,
      accessToken: accessToken,
    };
  }

  //        REFRESH
  // ===============================
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    // Avec la méthoe refresh fait plusieurs vérif, il le révoqué et genère la nouvelle pair de token
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.cookies['refresh_token'], // Récupère le refresh token stocké dans les cookies du client
    ); // Extraction des nouveaux JWT générés

    res.cookie('refresh_token', refreshToken, {
      // on sauvegarde le nouveau refresh token dans un cookie sécurisé
      httpOnly: true, // Empêche l'accès au cookie via JavaScript
      secure: false,
      sameSite: 'lax',
      maxAge: Number(process.env.JWT_REFRESH_EXP) * 24 * 60 * 60 * 1000,
    });

    return {
      // puis on retourne seulement l'access token
      accessToken: accessToken,
    };
  }

  // logout

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    // Nécessaire pour manipuler la réponse HTTP pour (clearCookie)
    // Récupère le refresh token depuis le cookie HttpOnly et le révoque en BDD
    await this.authService.logout(req.cookies['refresh_token']);
    res.clearCookie('refresh_token'); // Supprime le cookie refresh_token du navigateur côté client
  }

  // @UseGuards(AuthGuard)
  // @Get('profil')
  // async getProfil(@Req() req) {
  //   return this.authService.(req.user.sub)
  // }
}
