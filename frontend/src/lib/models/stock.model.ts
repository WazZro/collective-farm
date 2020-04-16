import { Product } from './product.model';
import { Type } from 'class-transformer';

export class Stock {
  public id?: number;
  @Type(() => Product) product: Product;
  public capacity: number;
  public congestion: number;

  get fullness(): number {
    return (this.congestion / this.capacity) * 100;
  }

  public addGood(count: number): void {
    if (count + this.congestion > this.capacity)
      throw new Error('Not enough space');
    this.congestion += count;
  }
}
