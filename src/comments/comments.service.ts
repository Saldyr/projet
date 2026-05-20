import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Comments } from 'prisma/generated/prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDto): Promise<Comments> {
    // Création d'un commentaire en base de données
    const newComment = await this.prisma.comments.create({ data });
    return newComment;
  }

  async findAll(page = 1): Promise<Comments[]> {
    // Nombre de commentaires par page (pagination)
    const take = Number(process.env.COMMENT_LIMIT);

    // Calcul du skip pour la pagination
    const skip = take * (page - 1);

    // Récupère les commentaires
    const allComments = await this.prisma.comments.findMany({
      take,
      skip,
    });

    return allComments;
  }

  async findOne(id: number): Promise<Comments> {
    // Récupère un commentaire ou throw si introuvable
    return await this.prisma.comments.findUniqueOrThrow({
      where: { id },
    });
  }

  async countOneById(id: number): Promise<number> {
    // Vérifie l'existence d'un commentaire
    return await this.prisma.comments.count({
      where: { id },
    });
  }

  async update(id: number, body: UpdateCommentDto): Promise<void> {
    // Mise à jour du commentaire
    await this.prisma.comments.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number): Promise<void> {
    // Suppression du commentaire
    await this.prisma.comments.delete({
      where: { id },
    });
  }
}