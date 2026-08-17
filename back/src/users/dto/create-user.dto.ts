import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // ===============================
  //        EMAIL SECTION
  // ===============================
  @IsString({
    message: "L'email doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "L'email est obligatoire pour l'inscription",
  })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  @IsEmail(
    {},
    {
      message: "L'email doit être une adresse email valide",
    },
  )
  @MaxLength(72)
  email: string;

  // ===============================
  //        PASSWORD SECTION
  // ===============================
  @IsString({
    message: 'Le mot de passe doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: "Le mot de passe est obligatoire pour l'inscription",
  })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir 8 caractères',
  })
  @MaxLength(72, {
    message: 'Le mot de passe doit avoir 72 caractères maximum',
  })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message:
      'Le mot de passe doit contenir une minuscule, une majuscule et un chiffre.',
  })
  password: string;

  // ===============================
  //        FIRSTNAME SECTION
  // ===============================
  @IsString({
    message: 'Le prénom doit être une chaîne de caractères',
  })
  @MinLength(2, { message: 'Le nom doit avoir 2 caractères minimum' })
  @MaxLength(50, { message: 'Le nom doit avoir 50 caractères maximum' })
  @IsNotEmpty({
    message: "Le prénom est obligatoire pour l'inscriptione",
  })
  firstName: string;

  // ===============================
  //        LASTNAME SECTION
  // ===============================
  @IsString({
    message: 'Le nom doit être une chaîne de caractères',
  })
  @MinLength(2, { message: 'Le nom doit avoir 2 caractères minimum' })
  @MaxLength(50, { message: 'Le nom doit avoir 50 caractères maximum' })
  @IsNotEmpty({
    message: "Le nom est obligatoire pour l'inscription",
  })
  lastName: string;
}
