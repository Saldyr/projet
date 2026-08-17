import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  currentPassword?: string; //ancien mdp pour vérification

  @IsString()
  @IsOptional()
  @MinLength(8)
  newPassword?: string; //nouveau à hasher
}
