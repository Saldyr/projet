import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  userId: number;

  @IsInt()
  articleId: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}