import { PartialType } from '@nestjs/mapped-types';
import { CreateLikearticleDto } from './create-likearticle.dto';

export class UpdateLikearticleDto extends PartialType(CreateLikearticleDto) {}
