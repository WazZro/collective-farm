import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

export class SessionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return !!request.session?.passport?.user;
  }
}
