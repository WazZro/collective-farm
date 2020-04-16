import { Type } from 'class-transformer';

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  roles: any[];
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
