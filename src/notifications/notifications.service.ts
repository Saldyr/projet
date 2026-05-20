import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notifications } from 'prisma/generated/prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateNotificationDto): Promise<Notifications> {
    return await this.prisma.notifications.create({ data });
  }

  async findAll(): Promise<Notifications[]> {
    return await this.prisma.notifications.findMany();
  }

  async findOne(id: number): Promise<Notifications> {
    return await this.prisma.notifications.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, data: UpdateNotificationDto): Promise<void> {
    await this.prisma.notifications.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.notifications.delete({
      where: { id },
    });
  }
}