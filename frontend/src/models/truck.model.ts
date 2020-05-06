import { TruckModel } from './truck-model.model';
import { Type } from 'class-transformer';
import { User } from './user.model';

export class Truck {
  id?: number;
  registrationNumber: number;
  @Type(() => TruckModel) model: TruckModel;
  @Type(() => User) drivers: User[];

  public get name(): string {
    return `${this.model.name} - ${this.registrationNumber}`;
  }
}
