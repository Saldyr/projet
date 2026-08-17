import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikecommentService } from './likecomment.service';
import { CreateLikecommentDto } from './dto/create-likecomment.dto';
import { UpdateLikecommentDto } from './dto/update-likecomment.dto';

@Controller('likecomment')
export class LikecommentController {
  constructor(private readonly likecommentService: LikecommentService) {}

  @Post()
  create(@Body() createLikecommentDto: CreateLikecommentDto) {
    return this.likecommentService.create(createLikecommentDto);
  }

  @Get()
  findAll() {
    return this.likecommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likecommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikecommentDto: UpdateLikecommentDto) {
    return this.likecommentService.update(+id, updateLikecommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likecommentService.remove(+id);
  }
}
