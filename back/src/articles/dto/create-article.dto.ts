import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {

  @IsInt()
  @IsNotEmpty()
  clubId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
