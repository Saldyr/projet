import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'prisma/generated/prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //injection de dépendances
  constructor(
    private prisma: PrismaService, // Service Prisma permettant de communiquer avec la base de données
    private jwt: JwtService, // Service JWT utilisé pour créer et vérifier les tokens d'authentification
    private userService: UsersService,
  ) {}

  async generateToken(
    payload: Record<string, string | number>,
  ): Promise<string> {
    // const refreshToken = await this.jwt.signAsync(payload, { expiresIn: "1w", algorithm: "HS256", secret: process.env.REFRESH_SECRET_KEY})
    return await this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_ACCESS_EXP as any, // Options des tokens générés ici on dit que la validité du token est de 1 jours
      algorithm: process.env.JWT_ALGO as any,
      secret: process.env.JWT_ACCESS_SECRET
    });
  }

  async register(
    data: CreateUserDto,
  ): Promise<{
    user: Omit<Users, 'createdAt' | 'updatedAt' | 'password'>;
    access_token: string;
  }> {
    // On cherche si un utilisateur avec cet email existe déjà en BDD
    const existingUser = await this.userService.countOneByEmail(data.email);

    // Si un utilisateur est trouvé, on stoppe l'inscription avec une erreur 409
    if (existingUser) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    // On hache le mot de passe avant de le stocker, on ne stocke JAMAIS le mot de passe brut
    const hashedPassword = await this.hash(data.password);

    // On crée l'utilisateur en BDD avec le mot de passe haché
    const user = await this.userService.createUser(data, hashedPassword);

    // On génère le token JWT pour connecter l'utilisateur directement après l'inscription
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.generateToken(payload);

    return { user, access_token };
  }

  async login(login: LoginDTO): Promise<{ user: Users; access_token: string }> {
    const { email, password } = login;

    const user = await this.userService.findByEmail(
      email ,
    );

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    if (!await this.compareHash(password, user.password)) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    
    return {user: user, access_token: await this.generateToken({sub: user.id, email: user.email})};
  }

  async validateUser(id: number): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
  } | null> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }




  async hash(toHash: string): Promise<string> {
    return await bcrypt.hash(toHash, process.env.SALT ?? 10);
  }

  async compareHash(notHashed: string, hashed: string ): Promise<boolean> {
    const result= await bcrypt.compare(notHashed, hashed);
    console.log("🚀 ~ AuthService ~ compareHash ~ result:", result)
    return result
  }
}
