import {  Module, Global } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ClubsModule } from 'src/clubs/clubs.module';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Global()
@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [UsersModule, ClubsModule],
  exports: [ArticlesService]
})
export class ArticlesModule {}
