import {
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Clubs } from 'prisma/generated/prisma/client';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  async create(@Body() body: CreateClubDto): Promise<Clubs> {
    return await this.clubsService.create(body);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ): Promise<Clubs[]> {
    return await this.clubsService.findAll(page);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Clubs> {
    try {
      return await this.clubsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateClubDto,
  ): Promise<void> {

    // Vérifie si le body est vide
    if (!body || JSON.stringify(body).trim() === '{}')
      throw new BadRequestException();

    // Vérifie si le club existe en base de données
    if (!(await this.clubsService.countOneById(id))) {
      throw new NotFoundException();
    }

    // Mise à jour du club
    await this.clubsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {

    // Vérifie si le club existe avant suppression
    if (!(await this.clubsService.countOneById(id)))
      throw new NotFoundException();

    // Suppression du club
    await this.clubsService.remove(id);
  }
}