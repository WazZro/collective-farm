import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../../models/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public logIn(@Request() request): Promise<User> {
    return request.user;
  }
}
