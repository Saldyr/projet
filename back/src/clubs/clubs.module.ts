import { Global, Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';

@Global() // Rend le module accessible globalement dans toute l'application
@Module({
  controllers: [ClubsController], // Gère les routes HTTP liées aux clubs
  providers: [ClubsService], // Contient la logique métier des clubs
  exports: [ClubsService], // Permet d'utiliser ClubsService dans d'autres modules
  imports: [],
})
export class ClubsModule {} // Module dédié à la gestion des clubs