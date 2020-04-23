import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionGuard } from './session.guard';
import { ROLE_META } from '../constants';
import { UserRoles } from '../interfaces/user-role.enum';

@Injectable()
export class RoleGuard extends SessionGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>(ROLE_META, context.getHandler());
    if (!roles?.length) return true;

    const isAuth = super.canActivate(context);
    const hasRole = roles.includes(request.user?.role);
    if (isAuth && (hasRole || request.user.role === UserRoles.ADMIN))
      return true;
    if (isAuth && !hasRole) return false;
    throw new UnauthorizedException();
  }
}
