import 'reflect-metadata';
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRoles } from '../interfaces/user-role.enum';
import { ROLE_META } from '../constants';

export const Role = (...roles: UserRoles[]): CustomDecorator =>
  SetMetadata(ROLE_META, roles);
