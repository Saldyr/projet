import {
  Get,
  Req,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'prisma/generated/prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { isEmptyBody } from 'src/common/utils/is-empty-body.util';
import type { RequestWithUser } from 'src/common/request.with.user.interface';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async findMyProfile(
    @Req() request: RequestWithUser,
  ): Promise<Omit<Users, 'password'>> {
    try {
      const id = request.userId;
      return await this.usersService.findOneOrThrow(id);
    } catch {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ): Promise<Omit<Users, 'password'>[]> {
    return await this.usersService.findAll(page);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<Users, 'password'>> {
    try {
      return await this.usersService.findOneOrThrow(id);
    } catch {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }

  /*
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, //Le userId est récupérer ici au lieu de l'URL
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    // Refuse les mises à jour sans données.
    if (isEmptyBody(body))
      throw new BadRequestException('Le body de mise à jour est vide');

    // Vérifie que l'utilisateur existe avant modification.
    if (!(await this.usersService.countOneById(id))) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Met à jour l'utilisateur.
    await this.usersService.update(id, body);
  }
  */

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('me')
  async update(
    @Req() request: RequestWithUser, //Le userId est récupérer ici au lieu de l'URL
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    const id = request.userId;

    // Refuse les mises à jour sans données.
    if (isEmptyBody(body))
      throw new BadRequestException('Le body de mise à jour est vide');

    // Vérifie que l'utilisateur existe avant modification.
    if (!(await this.usersService.countOneById(id))) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Met à jour l'utilisateur.
    await this.usersService.update(id, body);
  }

  /*
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Vérifie que l'utilisateur existe avant suppression.
    if (!(await this.usersService.countOneById(id)))
      throw new NotFoundException('Utilisateur introuvable');

    await this.usersService.remove(id);
  }
  */

  //User
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  async removeMe(@Req() request: RequestWithUser): Promise<void> {
    const id = request.userId;

    if (!(await this.usersService.countOneById(id)))
      throw new NotFoundException('Utilisateur introuvable');

    await this.usersService.remove(id);
  }
}
