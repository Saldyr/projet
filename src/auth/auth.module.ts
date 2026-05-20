import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule, // Module Passport sert à gérer l'authentification (login, guards, stratégies...)
    JwtModule.register({ // Configuration du module JWT
      global: true, // le module JWT accessible partout dans l'application
    }),
  ],
  controllers: [AuthController], // Controle des routes d'authentification
  providers: [AuthService, PrismaService],
  /*
  AuthService Contient la logique métier de l'authentification
  JwtStrategy c'est la stratégie JWT utilisée pour vérifier les tokens
  PrismaService service Prisma pour accéder à la base de données
  */
})
export class AuthModule {}
