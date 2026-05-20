import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagesService } from './manages.service';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';

@Controller('manages')
export class ManagesController {
  constructor(private readonly managesService: ManagesService) {}

  @Post()
  create(@Body() createManageDto: CreateManageDto) {
    return this.managesService.create(createManageDto);
  }

  @Get()
  findAll() {
    return this.managesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageDto: UpdateManageDto) {
    return this.managesService.update(+id, updateManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managesService.remove(+id);
  }
}
