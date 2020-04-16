/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { UserRoles } from '../interfaces/user-role.enum';

export class UserDto {
  id: number;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  firstName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  lastName: string;

  @IsOptional({ always: true })
  @IsNotEmpty({ always: true })
  middleName: string;

  @IsNotEmpty({ always: true })
  password: string;

  @IsDate({ always: true })
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty({ always: true })
  @IsPhoneNumber('ZZ')
  phone: string;

  @IsDate({ always: true })
  @Type(() => Date)
  startWorkDate: Date;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;
}

export class UserUpdateDto {
  id: number;

  firstName: string;

  lastName: string;

  middleName: string;
  birthDate: Date;

  phone: string;

  startWorkDate: Date;

  @IsEnum(UserRoles)
  role: UserRoles;
}
