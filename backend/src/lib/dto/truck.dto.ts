/* eslint-disable max-classes-per-file */
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TruckModel } from '../../models/truck-model.entity';
import { EntityResolver } from '../decorators/resolver.decorator';
import { User } from '../../models/user.entity';

export class TruckCreateDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @IsNotEmpty()
  @EntityResolver(TruckModel)
  model: TruckModel;

  @IsOptional()
  @IsArray()
  @EntityResolver(User)
  drivers: User[];
}

export class TruckUpdateDto {
  @Transform(() => undefined)
  id: number;

  @IsOptional()
  @IsString()
  registrationNumber: string;

  @IsOptional()
  @EntityResolver(TruckModel)
  model: TruckModel;

  @IsOptional()
  @IsArray()
  @EntityResolver(User)
  drivers: User[];
}
