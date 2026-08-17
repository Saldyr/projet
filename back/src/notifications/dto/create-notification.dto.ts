import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { NotificationTypeEnum } from 'prisma/generated/prisma/client';

export class CreateNotificationDto {
  //La notifications doit être une chaîne de caractère et non vide 
  @IsString()
  @IsNotEmpty()
  text: string;


  // Type de relation lié à la notification, il doit correspondre à une valeur de l'enum Prisma (ARTICLE, MATCH, COMMENT)
  @IsEnum(NotificationTypeEnum)
  relationType: NotificationTypeEnum;

  // ID de l'entité liée (article, match ou commentaire)
  @IsInt()
  relationId: number;


  // Données supplémentaires optionnelles au format JSON
  // peut contenir n'importe quel objet (ex: userId, action, etc.)
  @IsObject()
  metadata: Record<string, any>;
}

// Sert à valider les données envoyées par le client (body de requête HTTP)