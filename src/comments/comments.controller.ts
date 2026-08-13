import {
  Get,
  Body,
  Post,
  Query,
  Patch,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { isEmptyBody } from 'src/common/utils/is-empty-body.util';
import { CommentsService } from './comments.service';
import { Comments } from 'prisma/generated/prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() body: CreateCommentDto): Promise<Comments> {
    return await this.commentsService.create(body);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ): Promise<Comments[]> {
    return await this.commentsService.findAll(page);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comments> {
    try {
      return await this.commentsService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Commentaire introuvable');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
  ): Promise<void> {
    // Refuse les mises à jour sans données.
    if (isEmptyBody(body))
      throw new BadRequestException('Le body de mise à jour est vide');

    // Vérifie que le commentaire existe avant modification.
    if (!(await this.commentsService.countOneById(id))) {
      throw new NotFoundException('Commentaire introuvable');
    }

    // Met à jour le commentaire.
    await this.commentsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Vérifie que le commentaire existe avant suppression.
    if (!(await this.commentsService.countOneById(id)))
      throw new NotFoundException('Commentaire introuvable');

    // Supprime le commentaire.
    await this.commentsService.remove(id);
  }
}