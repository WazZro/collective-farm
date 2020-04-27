import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../models/user.entity';
import { LocalAuthGuard } from '../../lib/guards/local-auth.guard';
import { Role } from '../../lib/decorators/role.decorator';
import { UserRoles } from '../../lib/interfaces/user-role.enum';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public logIn(@Request() request): Promise<User> {
    return request.user;
  }

  @Get('logout')
  @Role(
    UserRoles.ACCOUNTANT,
    UserRoles.ADMIN,
    UserRoles.DRIVER,
    UserRoles.MANAGER,
  )
  public logOut(@Request() request): Promise<void> {
    return this.authService.logOut(request);
  }

  @Get('me')
  @Role(
    UserRoles.ACCOUNTANT,
    UserRoles.ADMIN,
    UserRoles.DRIVER,
    UserRoles.MANAGER,
  )
  public getCurrentUser(@Request() request): Promise<User> {
    return request.user;
  }
}
