// Injectable permet à NestJS d'injecter ce service dans d'autres classes
import { Injectable } from '@nestjs/common';

// DTO utilisé pour valider et typer les données lors de la création d'un article
import { CreateArticleDto } from './dto/create-article.dto';

// Pour valider et typer les données lors de la mise à jour d'un article
import { UpdateArticleDto } from './dto/update-article.dto';

// Type Prisma représentant le modèle Articles dans la base de données
import { Articles } from 'prisma/generated/prisma/client';

// Service Prisma utilisé pour communiquer avec la base de données
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
// Service responsable de toute la logique métier liée aux articles
export class ArticlesService {
  // Injection du service Prisma pour accéder à la base de données
  constructor(private prisma: PrismaService) {}

  async create(data: CreateArticleDto): Promise<Articles> {
    // Crée un nouvel article en base de données
    const newArticle = await this.prisma.articles.create({ data }); // Envoie les données reçues à Prisma
    return newArticle; // Retourne l'article créé avec ses données complètes
  }

  async findAll(page = 1): Promise<Omit<Articles, 'clubId' | 'userId'>[]> {
    // Nombre d’articles à afficher par page (pagination)
    // Récupéré depuis le fichier .env
    const take = Number(process.env.ARTICLE_LIMIT);

    // Calcul du nombre d’éléments à ignorer selon la page
    // page 1 → skip 0
    // page 2 → skip ARTICLE_LIMIT * 1
    const skip = take * (page - 1);

    // Récupère les articles avec pagination
    const allArticles = await this.prisma.articles.findMany({
      take, // limite le nombre de résultats retournés
      skip, // décale les résultats pour la pagination

      // On retire les champs internes/non exposés à l’API
      omit: {
        clubId: true,
        userId: true,
      },
    });
    return allArticles;
  }

  async countOneById(id: number): Promise<number> {
    return await this.prisma.articles.count({ where: { id } });
  }

  async findOne(id: number): Promise<Omit<Articles, 'clubId' | 'userId'>> {
    return await this.prisma.articles.findUniqueOrThrow({
      // Récupère un article via son identifiant UNIQUE (id)
      // findUniqueOrThrow → renvoie l'article ou lève une erreur si introuvable
      where: { id }, // filtre sur la clé unique de l'article
      // On exclut les champs sensibles / internes
      // pour éviter de renvoyer des données inutiles ou non exposées par l'API
      omit: {
        clubId: true,
        userId: true,
      },
    });
  }

  async update(id: number, body: UpdateArticleDto): Promise<void> {
    await this.prisma.articles.update({ where: { id }, data: body });
    // Met à jour un article en base de données
    // where: sélection de l'article via son id (clé unique)
    // data: nouvelles données à appliquer (DTO validé côté controller)
  }

  async remove(id: number): Promise<void> {
    // Supprime un article en base de données via son id
    await this.prisma.articles.delete({ where: { id } });
  }
}
