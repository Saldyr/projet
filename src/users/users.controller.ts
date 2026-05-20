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
import type { RequestWithUser } from 'src/common/request.with.user.interface';


@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ): Promise<Omit<Users, 'password'>[]> {
    return await this.usersService.findAll(page);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findMyProfile(
    @Req() request: RequestWithUser,
  ): Promise<Omit<Users, 'password'>> {
    try {
      const id = request.userId;
      return await this.usersService.findOneOrThrow(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<Users, 'password'>> {
    try {
      return await this.usersService.findOneOrThrow(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    // Vérifier si le body est vide
    if (!body || JSON.stringify(body).trim() === '{}')
      throw new BadRequestException();

    // On vérifie si l'user existe en DB
    if (!(await this.usersService.countOneById(id))) {
      throw new NotFoundException();
    }

    //on modifie l'user si on le retrouve qui se trouve dans le body
    await this.usersService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // verif Id = user in Db
    if (!(await this.usersService.countOneById(id)))
      throw new NotFoundException();
    await this.usersService.remove(id);
  }
}
