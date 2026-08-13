import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/clubs.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ManagesModule } from './manages/manages.module';
import { MatchesModule } from './matches/matches.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { NotifiesModule } from './notifies/notifies.module';
import { LikearticleModule } from './likearticle/likearticle.module';
import { LikecommentModule } from './likecomment/likecomment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TokensServices } from './tokens/tokens.services';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // forRoot() charge automatiquement le fichier .env isGlobal: true rend les variables accessibles dans tous les modules
    PrismaModule,
    UsersModule,
    ArticlesModule,
    ClubsModule,
    NotificationsModule,
    CommentsModule,
    ManagesModule,
    NotifiesModule,
    MatchesModule,
    LikearticleModule,
    LikecommentModule,
    AuthModule,
    HashModule,
  ],
  providers: [TokensServices],
})
export class AppModule {}
