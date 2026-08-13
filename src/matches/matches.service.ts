import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Matches } from 'prisma/generated/prisma/client';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createMatchDto: CreateMatchDto,
    userId: number,
  ): Promise<Matches> {
    // Le createur est impose cote serveur via le JWT, jamais depuis le body client.
    const newMatch = await this.prisma.matches.create({
      data: { ...createMatchDto, userId },
    });
    return newMatch;
  }

  async findAll(): Promise<Matches[]> {
    return await this.prisma.matches.findMany();
  }

  async findOne(id: number): Promise<Matches | null> {
    return await this.prisma.matches.findUnique({ where: { id } });
  }

  async countOneById(id: number): Promise<number> {
    // Sert a verifier l'existence d'un match avant update/delete.
    return await this.prisma.matches.count({ where: { id } });
  }

  async countClubById(id: number): Promise<number> {
    // Sert a valider les cles etrangeres clubHomeId/clubAwayId.
    return await this.prisma.clubs.count({ where: { id } });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Matches> {
    return await this.prisma.matches.update({ where: { id }, data: updateMatchDto });
  }

  async remove(id: number): Promise<Matches> {
    return await this.prisma.matches.delete({ where: { id } });
  }

  async findOneOrThrowForUser(id: number, userId: number): Promise<Matches> {
    const match = await this.findOne(id);

    if (!match) {
      throw new NotFoundException('Match introuvable');
    }

    if (match.userId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que les matchs que vous avez crees',
      );
    }

    return match;
  }
}
