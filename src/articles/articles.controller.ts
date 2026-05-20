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
      throw new NotFoundException();
    }
  }

  // @Get(':clubId')
  // async findByClubs(
  //   @Param('clubId', ParseIntPipe) id: number,
  // ): Promise<Omit<Articles, 'userId'>> {
  //   try {
  //     return await this.articlesService.findByClub(id);
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateArticleDto,
  ): Promise<void> {
    // Vérifie si le body est vide ou invalide
    // (évite de faire une update sans données)
    if (!body || JSON.stringify(body).trim() === '{}')
      throw new BadRequestException();
    // Vérifie si l'article existe en base de données
    // sinon on renvoie une erreur 404
    if (!(await this.articlesService.countOneById(id))) {
      throw new NotFoundException();
    }
    // Mise à jour de l'article avec les nouvelles données reçues
    await this.articlesService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Vérifie si l'article existe avant suppression
    // Si non → on renvoie une erreur 404 (Not Found)
    if (!(await this.articlesService.countOneById(id)))
      throw new NotFoundException();
    // Suppression de l'article en base de données
    await this.articlesService.remove(id);
  }
}
