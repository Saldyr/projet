import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Global() // Rend le module accessible globalement (pas besoin de l'importer ailleurs)
@Module({
  controllers: [UsersController], // Gère les routes HTTP liées aux utilisateurs
  providers: [UsersService], // Contient la logique métier (injectable via DI (injection de dépendances))
  exports: [UsersService], // Permet d'utiliser UsersService dans d'autres modules
  imports: [],
})
export class UsersModule {} // Module dédié à la gestion des utilisateurs
