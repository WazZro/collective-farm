/* eslint-disable max-classes-per-file */
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { UserRoles } from '../interfaces/user-role.enum';
import { Private } from '../decorators/private.decorator';

export class UserDto {
  id?: number;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  firstName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  lastName: string;

  @IsOptional({ always: true })
  @IsNotEmpty({ always: true })
  middleName?: string;

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
  @Transform(() => undefined)
  id: number;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  phone: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Private({
    allowRoles: [UserRoles.MANAGER],
  })
  startWorkDate: Date;

  @IsOptional()
  @IsEnum(UserRoles)
  @Private({
    allowRoles: [UserRoles.MANAGER],
  })
  role: UserRoles;
}
