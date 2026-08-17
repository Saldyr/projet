import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { isEmptyBody } from 'src/common/utils/is-empty-body.util';
import { NotificationsService } from './notifications.service';
import { Notifications } from 'prisma/generated/prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() body: CreateNotificationDto): Promise<Notifications> {
    return await this.notificationsService.create(body);
  }

  @Get()
  async findAll(): Promise<Notifications[]> {
    return await this.notificationsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Notifications> {
    try {
      return await this.notificationsService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Notification introuvable');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNotificationDto,
  ): Promise<void> {
    // Refuse les mises à jour sans données.
    if (isEmptyBody(body))
      throw new BadRequestException('Le body de mise à jour est vide');

    await this.notificationsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.notificationsService.remove(id);
  }
}