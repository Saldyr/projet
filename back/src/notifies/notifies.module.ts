import { Module } from '@nestjs/common';
import { NotifiesService } from './notifies.service';
import { NotifiesController } from './notifies.controller';

@Module({
  controllers: [NotifiesController],
  providers: [NotifiesService],
})
export class NotifiesModule {}
