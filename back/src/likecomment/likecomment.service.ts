import { Injectable } from '@nestjs/common';
import { CreateLikecommentDto } from './dto/create-likecomment.dto';
import { UpdateLikecommentDto } from './dto/update-likecomment.dto';

@Injectable()
export class LikecommentService {
  create(createLikecommentDto: CreateLikecommentDto) {
    return 'This action adds a new likecomment';
  }

  findAll() {
    return `This action returns all likecomment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likecomment`;
  }

  update(id: number, updateLikecommentDto: UpdateLikecommentDto) {
    return `This action updates a #${id} likecomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} likecomment`;
  }
}
