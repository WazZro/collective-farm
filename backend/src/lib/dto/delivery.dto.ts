/* eslint-disable max-classes-per-file */
import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Product } from '../../models/product.entity';
import { EntityResolver } from '../decorators/resolver.decorator';
import { Truck } from '../../models/truck.entity';
import { User } from '../../models/user.entity';
import { Stock } from '../../models/stock.entity';
import { DeliveryStatus } from '../interfaces/delivery-status.enum';

export class DeliveryCreateDto {
  id?: number;

  @IsEmpty()
  @Transform(() => undefined)
  status: DeliveryStatus;

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
  @IsDate()
  deliveryDate: Date;
}
