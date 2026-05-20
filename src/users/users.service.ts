import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'prisma/generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  async createUser(
    // COMMENTAIRE
    data: CreateUserDto,
    hashedPassword: string,
  ): Promise<Omit<Users, "createdAt"| "updatedAt" | "password">> {
    return await this.prisma.users.create({
      data: { ...data, password: hashedPassword },
      select: {id: true, firstName: true, email: true, lastName: true }
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    // On retourne soit un user soit null
    return await this.prisma.users.findUnique({ where: { email } });
  }

  async findAll(page = 1): Promise<Omit<Users, 'password'>[]> {
    // Nombre d'utilisateurs à récupérer par page (pagination)
    // Défini dans les variables d'environnement (.env)
    const take = Number(process.env.USER_LIMIT);

    // Calcul du décalage pour la pagination :
    // page 1 → skip 0
    // page 2 → skip USER_LIMIT * 1
    const skip = take * (page - 1);

    // Récupère une liste d'utilisateurs avec pagination
    const allUsers = await this.prisma.users.findMany({
      take, // nombre de résultats par page
      skip, // nombre de résultats à ignorer

      // On retire le mot de passe pour des raisons de sécurité
      omit: {
        password: true,
      },
    });
    return allUsers;
  }

  async findOneOrThrow(id: number): Promise<Omit<Users, 'password'>> {
    return await this.prisma.users.findUniqueOrThrow({
      //Récupère un utilisateur via un champ UNIQUE (id)
      // Si aucun utilisateur n'est trouvé → Prisma lance une erreur automatiquement
      where: { id },
      // On exclut le mot de passe pour éviter de l'exposer dans la réponse API
      omit: {
        password: true,
      },
    });
  }

  async countOneById(id: number): Promise<number> {
    return await this.prisma.users.count({ where: { id } });
  }

  async countOneByEmail(email: string): Promise<number> {
    return await this.prisma.users.count({ where: { email } });
  }

  async update(id: number, body: UpdateUserDto): Promise<void> {
    // On modifie les champs qui ont changés
    await this.prisma.users.update({ where: { id }, data: body });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.users.delete({ where: { id } });
  }
}
