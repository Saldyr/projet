import { IsNotEmpty, IsString } from "class-validator";

export class CreateClubDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  acronyme: string;

  @IsString()
  @IsNotEmpty()
  creationDate: string;

  @IsString()
  @IsNotEmpty()
  presidentName: string;

  @IsString()
  @IsNotEmpty()
  trainerName: string;
    
  @IsString()
  @IsNotEmpty()
  rna: string;
}
