import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: "L'email doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "L'email est obligatoire pour l'inscription",
  })
  @IsEmail({
    blacklisted_chars: "!/?(){}',;:%*^$<>#&[]",
  })
  email: string;

  @IsString({
    message: 'Le mot de passe doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: "Le mot de passe est obligatoire pour l'inscription",
  })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir 8 caractères',
  })
  password: string;

  @IsString({
    message: 'Le prénom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: "Le prénom est obligatoire pour l'inscriptione",
  })
  firstName: string;

  @IsString({
    message: 'Le nom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: "Le nom est obligatoire pour l'inscription",
  })
  lastName: string;
}
