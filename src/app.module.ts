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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
  ],
})
export class AppModule {}
