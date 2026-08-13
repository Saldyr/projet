import { Injectable } from '@nestjs/common';
import { Tokens, TokenTypeEnum } from 'prisma/generated/prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
// Injection de dépendance Prisma service
export class TokensServices {
  constructor(private prisma: PrismaService) {}

  // ===============================
  //        SaveTokens
  // ===============================
  async saveTokens(
    // Fonction pour sauvegarder le token en BDD
    userId: number,
    tokenType: TokenTypeEnum, // Ici le type du token
    token: string, // et le token à save dans la BDD
    userAgent: string, // Information sur le navigateur du client
    expiresAt: Date,
  ): Promise<Tokens> {
    // Promesse de l'objet Token
    return await this.prisma.tokens.create({
      data: { userId, tokenType, token, userAgent, expiresAt },
    });
    // on créer une nouvelle ligne dans la table Tokens
    // En retournant un objet avec data qui contient toutes les informations
  }

  // ===============================
  //        VerifyToken
  // ===============================

  async verifyTokenOrThrow(token: string): Promise<Tokens> {
    const storedToken = await this._findUniqueTokenOrThrow(token); // on cherche si le refresh token est en base sinon exception
    if (storedToken.expiresAt < new Date() || storedToken.revokedAt !== null) {
      throw new Error();
    }
    return storedToken;
  }

  private async _findUniqueTokenOrThrow(token: string): Promise<Tokens> {
    // Fonction privée pour chercher un token
    return await this.prisma.tokens.findUniqueOrThrow({ where: { token } });
  }

  // ===============================
  //        RevokeToken
  // ===============================

  async revokeTokenOrThrow(token: string): Promise<Tokens> {
    return await this.prisma.tokens.update({
      // Une fois trouver on le met à jour
      where: { token }, // On retrouve le token à modifier par son emprunte token
      data: { revokedAt: new Date() }, // Puis on ajoute la date de quand il a été revoqué
      // Si revokedAt !== null alors le token est considéré invalide
    });
  }
}

// A voir sur l'utilisation du revoke
