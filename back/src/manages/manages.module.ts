import { Module } from '@nestjs/common';
import { ManagesService } from './manages.service';
import { ManagesController } from './manages.controller';

@Module({
  controllers: [ManagesController],
  providers: [ManagesService],
})
export class ManagesModule {}
