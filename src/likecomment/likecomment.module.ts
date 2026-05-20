import { Module } from '@nestjs/common';
import { LikecommentService } from './likecomment.service';
import { LikecommentController } from './likecomment.controller';

@Module({
  controllers: [LikecommentController],
  providers: [LikecommentService],
})
export class LikecommentModule {}
