import { TruckModel } from './truck-model.model';
import { Type } from 'class-transformer';
import { User } from './user.model';

export class Truck {
  public id?: number;
  public registrationNumber: number;
  @Type(() => TruckModel) public model: TruckModel;
  @Type(() => User) public drivers: User[];
}
