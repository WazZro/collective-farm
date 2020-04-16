/* eslint-disable max-classes-per-file */
import { Product } from '../../models/product.entity';
import { EntityResolver } from '../decorators/resolver.decorator';
import { Truck } from '../../models/truck.entity';
import { User } from '../../models/user.entity';

export class DeliveryCreateDto {
  public id: number;

  @EntityResolver(Product)
  public product: Product;

  @EntityResolver(Truck)
  public truck: Truck;

  @EntityResolver(User)
  public driver: User;

  public volume: number;

  public startDeliveryDate: Date;

  public deliveryDate: Date;
}

export class DeliveryUpdateDto {
  public id: number;

  @EntityResolver(Product)
  public product: Product;

  @EntityResolver(Truck)
  public truck: Truck;

  @EntityResolver(User)
  public driver: User;

  public status: number;

  public volume: number;

  public startDeliveryDate: Date;

  public deliveryDate: Date;
}
