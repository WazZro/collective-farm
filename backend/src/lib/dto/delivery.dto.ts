/* eslint-disable max-classes-per-file */
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Product } from '../../models/product.entity';
import { Stock } from '../../models/stock.entity';
import { Truck } from '../../models/truck.entity';
import { User } from '../../models/user.entity';
import { EntityResolver } from '../decorators/resolver.decorator';
import { DeliveryStatus } from '../interfaces/delivery-status.enum';
import { DeliveryTypes } from '../interfaces/delivery-type.enum';

export class DeliveryCreateDto {
  id?: number;

  @IsEmpty()
  @Transform(() => undefined)
  status: DeliveryStatus;

  @IsNotEmpty()
  @IsEnum(DeliveryTypes)
  type: DeliveryTypes;

  @IsEmpty()
  @Transform(() => undefined)
  isDone: boolean;

  @EntityResolver(Product)
  @IsNotEmpty()
  product: Product;

  @EntityResolver(Truck)
  @IsNotEmpty()
  truck: Truck;

  @EntityResolver(User)
  @IsNotEmpty()
  driver: User;

  @IsNotEmpty()
  @EntityResolver(Stock)
  stock: Stock;

  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  deliveryDate: Date;
}

export class DeliveryUpdateDto {
  @Transform(() => undefined)
  id?: number;

  @IsEmpty()
  @Transform(() => undefined)
  status: DeliveryStatus;

  @IsEmpty()
  @Transform(() => undefined)
  isDone: boolean;

  @IsOptional()
  @EntityResolver(Product)
  product: Product;

  @IsOptional()
  @EntityResolver(Truck)
  truck: Truck;

  @IsOptional()
  @EntityResolver(User)
  driver: User;

  @IsOptional()
  @EntityResolver(Stock)
  stock: Stock;

  @IsOptional()
  @IsNumber()
  volume: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deliveryDate: Date;
}
