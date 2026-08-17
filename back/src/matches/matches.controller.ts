import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { RequestWithUser } from 'src/common/request.with.user.interface';
import { isEmptyBody } from 'src/common/utils/is-empty-body.util';
import { MatchesRulesService } from './matches-rules.service';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Matches } from 'prisma/generated/prisma/client';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchesRulesService: MatchesRulesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() request: RequestWithUser,
    @Body() createMatchDto: CreateMatchDto,
  ): Promise<Matches> {
    await this.matchesRulesService.validatePayload(createMatchDto);
    return await this.matchesService.create(createMatchDto, request.userId);
  }

  @Get()
  async findAll(): Promise<Matches[]> {
    return await this.matchesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Matches> {
    const data = await this.matchesService.findOne(id);
    if (!data) {
      throw new NotFoundException('Match introuvable');
    }
    return data;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto,
  ): Promise<void> {
    if (isEmptyBody(updateMatchDto)) {
      throw new BadRequestException('Le body de mise a jour est vide');
    }

    const existingMatch = await this.matchesService.findOneOrThrowForUser(
      id,
      request.userId,
    );

    const validatedPayload = this.matchesRulesService.buildValidatedPayload(
      updateMatchDto,
      existingMatch,
    );
    await this.matchesRulesService.validatePayload(validatedPayload);

    await this.matchesService.update(id, updateMatchDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.matchesService.findOneOrThrowForUser(id, request.userId);
    await this.matchesService.remove(id);
  }
}
