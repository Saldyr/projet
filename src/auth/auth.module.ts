import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { TokensServices } from 'src/tokens/tokens.services';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // Configuration du module JWT
      global: true, // le module JWT accessible partout dans l'application
    }),
  ],
  controllers: [AuthController], // Controle des routes d'authentification
  providers: [AuthService, PrismaService, TokensServices],
  /*
  AuthService Contient la logique métier de l'authentification
  JwtStrategy c'est la stratégie JWT utilisée pour vérifier les tokens
  PrismaService service Prisma pour accéder à la base de données
  */
})
export class AuthModule {}
