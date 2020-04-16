/* eslint-disable max-classes-per-file */
import { Product } from '../../models/product.entity';
import { EntityResolver } from '../decorators/resolver.decorator';

export class StockCreateDto {
  public id: number;

  @EntityResolver(Product)
  public product: Product;

  public capacity: number;
}

export class StockUpdateDto {
  public id: number;

  @EntityResolver(Product)
  public product: Product;

  public capacity: number;
}
