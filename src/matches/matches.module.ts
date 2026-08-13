import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchesRulesService } from './matches-rules.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, MatchesRulesService],
})
export class MatchesModule {}
