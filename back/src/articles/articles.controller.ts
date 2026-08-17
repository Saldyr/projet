import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { isEmptyBody } from 'src/common/utils/is-empty-body.util';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Articles } from 'prisma/generated/prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() body: CreateArticleDto): Promise<Articles> {
    return await this.articlesService.create(body);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ): Promise<Omit<Articles, 'clubId' | 'userId'>[]> {
    return await this.articlesService.findAll(page);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<Articles, 'clubId' | 'userId'>> {
    try {
      return await this.articlesService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Article introuvable');
    }
  }



  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateArticleDto,
  ): Promise<void> {
    // Refuse les mises à jour sans données.
    if (isEmptyBody(body))
      throw new BadRequestException('Le body de mise à jour est vide');

    // Vérifie que l'article existe avant modification.
    if (!(await this.articlesService.countOneById(id))) {
      throw new NotFoundException('Article introuvable');
    }

    // Met à jour l'article avec les nouvelles données reçues.
    await this.articlesService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Vérifie que l'article existe avant suppression.
    if (!(await this.articlesService.countOneById(id)))
      throw new NotFoundException('Article introuvable');

    // Supprime l'article en base de données.
    await this.articlesService.remove(id);
  }
}
