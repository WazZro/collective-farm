import { Type } from 'class-transformer';

export enum UserRoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DRIVER = 'driver',
  ACCOUNTANT = 'accountant',
}

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  role: UserRoles;
  password: string;
  phone: string;

  @Type(() => Date)
  birthDate: Date;

  @Type(() => Date)
  startWorkDate: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
