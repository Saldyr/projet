import { PartialType } from '@nestjs/mapped-types';
import { CreateLikecommentDto } from './create-likecomment.dto';

export class UpdateLikecommentDto extends PartialType(CreateLikecommentDto) {}
