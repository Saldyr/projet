import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Matches } from 'prisma/generated/prisma/client';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@Injectable()
export class MatchesRulesService {
  constructor(private readonly matchesService: MatchesService) {}

  async validatePayload(matchDto: CreateMatchDto): Promise<void> {
    // Interdit qu'un club joue contre lui-meme.
    if (matchDto.clubHomeId === matchDto.clubAwayId) {
      throw new BadRequestException(
        'Les clubs domicile et exterieur doivent etre differents',
      );
    }

    // Garantit un ordre chronologique coherent.
    if (new Date(matchDto.startDate) >= new Date(matchDto.endDate)) {
      throw new BadRequestException(
        'La date de debut doit etre avant la date de fin',
      );
    }

    // Verifie que les references de clubs existent
    // avant de laisser Prisma creer ou modifier le match.
    if (!(await this.matchesService.countClubById(matchDto.clubHomeId))) {
      throw new NotFoundException('Club domicile introuvable');
    }

    if (!(await this.matchesService.countClubById(matchDto.clubAwayId))) {
      throw new NotFoundException('Club exterieur introuvable');
    }
  }

  buildValidatedPayload(
    updateMatchDto: UpdateMatchDto,
    existingMatch: Matches,
  ): CreateMatchDto {
    return {
      clubHomeId: updateMatchDto.clubHomeId ?? existingMatch.clubHomeId,
      clubAwayId: updateMatchDto.clubAwayId ?? existingMatch.clubAwayId,
      startDate: updateMatchDto.startDate ?? existingMatch.startDate.toISOString(),
      endDate: updateMatchDto.endDate ?? existingMatch.endDate.toISOString(),
      matchAddress: updateMatchDto.matchAddress ?? existingMatch.matchAddress,
      scoreTeamHome:
        updateMatchDto.scoreTeamHome ?? existingMatch.scoreTeamHome ?? undefined,
      scoreTeamAway:
        updateMatchDto.scoreTeamAway ?? existingMatch.scoreTeamAway ?? undefined,
    };
  }
}
