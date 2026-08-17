import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // point d'entrée qui instancie toute l'application NestJS
  const app = await NestFactory.create(AppModule); // Création de l'application à partir AppModule (tous les modules à l'intérieur)
  app.enableCors({
    // on dis j'accepte les requêtes venant de cette adresse
    origin: 'http://localhost:5173', // adresse du client qui fait la requête
    credentials: true, // le navigateur accepte de transmettre les cookies au back
  });
  app.use(cookieParser()); // déstructuration du cookie pour les rendre accessible via req.cookie
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  //whitelist: true — supprime automatiquement les champs qui ne sont pas dans le DTO
  //forbidNonWhitelisted: true — va plus loin, si un champ non autorisé est envoyé il throw une erreur au lieu de juste le supprimer
  //transform: true — convertit automatiquement les types, par exemple une string "1" en number 1
  await app.listen(process.env.PORT ?? 3000); // port du .env sinon 3000 par défaut.
}
bootstrap(); // Démarrage de l'application
