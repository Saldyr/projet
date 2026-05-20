import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikearticleService } from './likearticle.service';
import { CreateLikearticleDto } from './dto/create-likearticle.dto';
import { UpdateLikearticleDto } from './dto/update-likearticle.dto';

@Controller('likearticle')
export class LikearticleController {
  constructor(private readonly likearticleService: LikearticleService) {}

  @Post()
  create(@Body() createLikearticleDto: CreateLikearticleDto) {
    return this.likearticleService.create(createLikearticleDto);
  }

  @Get()
  findAll() {
    return this.likearticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likearticleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikearticleDto: UpdateLikearticleDto) {
    return this.likearticleService.update(+id, updateLikearticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likearticleService.remove(+id);
  }
}
