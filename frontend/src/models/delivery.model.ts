import { Stock } from './stock.model';
import { Type } from 'class-transformer';
import { Truck } from './truck.model';
import { User } from './user.model';
import { Product } from './product.model';

export enum DeliveryStatus {
  CREATED,
  TRANSIT,
  WAIT_CONFIRM,
  CONFIRMED,
  DONE,
}

export enum DeliveryType {
  INCOMING,
  OUTCOMING,
}

export class Delivery {
  id?: number;
  status: DeliveryStatus;
  type: DeliveryStatus;
  isDone?: boolean;
  volume: number;
  @Type(() => Date) deliveryDate?: Date;
  @Type(() => Date) createdAt?: Date;
  @Type(() => Date) updatedAt?: Date;
  @Type(() => Truck) truck: Truck;
  @Type(() => User) driver: User;
  @Type(() => Product) product: Product;
  @Type(() => Stock) stock: Stock;
}
