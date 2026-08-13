import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  password: string;
}
