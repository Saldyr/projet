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
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNotificationDto,
  ): Promise<void> {
    if (!body || JSON.stringify(body).trim() === '{}')
      throw new BadRequestException();

    await this.notificationsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.notificationsService.remove(id);
  }
}