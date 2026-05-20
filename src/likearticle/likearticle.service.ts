import { Injectable } from '@nestjs/common';
import { CreateLikearticleDto } from './dto/create-likearticle.dto';
import { UpdateLikearticleDto } from './dto/update-likearticle.dto';

@Injectable()
export class LikearticleService {
  create(createLikearticleDto: CreateLikearticleDto) {
    return 'This action adds a new likearticle';
  }

  findAll() {
    return `This action returns all likearticle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likearticle`;
  }

  update(id: number, updateLikearticleDto: UpdateLikearticleDto) {
    return `This action updates a #${id} likearticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} likearticle`;
  }
}
