import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      //   request.user = payload
      request['userId'] = payload.sub;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

//verifyTokenOrThrow(token, secret: process.env.JWT_REFRESH_SECRET);
