import { Product } from './product.model';
import { Type } from 'class-transformer';

export class Stock {
  id?: number;
  @Type(() => Product) product: Product;
  capacity: number;
  congestion: number;

  public get name(): string {
    return `Склад #${this.id} - ${this.product?.name}`;
  }

  public get fullness(): number {
    return (this.congestion / this.capacity) * 100;
  }

  public addGood(count: number): void {
    if (count + this.congestion > this.capacity)
      throw new Error('Not enough space');
    this.congestion += count;
  }
}
