/* eslint-disable max-classes-per-file */
import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { TruckModel } from '../../models/truck-model.entity';
import { EntityResolver } from '../decorators/resolver.decorator';
import { User } from '../../models/user.entity';

export class TruckCreateDto {
  @IsOptional()
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public registrationNumber: string;

  @IsNotEmpty()
  @EntityResolver(TruckModel)
  public model: TruckModel;

  @IsOptional()
  @IsArray()
  @EntityResolver(User)
  public drivers: User[];
}

export class TruckUpdateDto {
  public id: number;

  public registrationNumber: string;

  @EntityResolver(TruckModel)
  public model: TruckModel;

  @EntityResolver(User)
  public drivers: User[];
}
