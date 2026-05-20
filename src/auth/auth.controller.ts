import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto){
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginDTO){ 
    return await this.authService.login(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  async getProfil(@Request() req) {
    return this.authService.validateUser(req.users.sub)
  }
}
