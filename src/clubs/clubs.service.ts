import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Clubs } from 'prisma/generated/prisma/client';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClubDto): Promise<Clubs> {
    // Création d'un nouveau club en base de données
    const newClub = await this.prisma.clubs.create({ data });

    // Retourne le club créé
    return newClub;
  }

  async findAll(page = 1): Promise<Clubs[]> {
    // Nombre de clubs par page (pagination)
    const take = Number(process.env.CLUB_LIMIT);

    // Calcul du nombre d'éléments à ignorer
    const skip = take * (page - 1);

    // Récupère les clubs avec pagination
    const allClubs = await this.prisma.clubs.findMany({
      take,
      skip,
    });

    return allClubs;
  }

  async findOne(id: number): Promise<Clubs> {
    // Recherche un club par son id
    // findUniqueOrThrow déclenche automatiquement une erreur
    // si aucun club n'est trouvé
    return await this.prisma.clubs.findUniqueOrThrow({
      where: { id },
    });
  }

  async countOneById(id: number): Promise<number> {
    // Compte le nombre de clubs correspondant à l'id
    return await this.prisma.clubs.count({
      where: { id },
    });
  }

  async update(id: number, body: UpdateClubDto): Promise<void> {
    // Met à jour un club via son id
    await this.prisma.clubs.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number): Promise<void> {
    // Supprime un club via son id
    await this.prisma.clubs.delete({
      where: { id },
    });
  }
}