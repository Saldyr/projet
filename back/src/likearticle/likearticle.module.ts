import { Module } from '@nestjs/common';
import { LikearticleService } from './likearticle.service';
import { LikearticleController } from './likearticle.controller';

@Module({
  controllers: [LikearticleController],
  providers: [LikearticleService],
})
export class LikearticleModule {}
