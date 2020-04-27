/* eslint-disable max-classes-per-file */
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { Product } from '../../models/product.entity';
import { EntityResolver } from '../decorators/resolver.decorator';

export class StockCreateDto {
  id?: number;

  @IsNotEmpty()
  @EntityResolver(Product)
  product: Product;

  @IsNumber()
  @Min(0)
  capacity: number;
}

export class StockUpdateDto {
  @Transform(() => undefined)
  id: number;

  @IsOptional()
  @EntityResolver(Product)
  product: Product;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacity: number;
}
