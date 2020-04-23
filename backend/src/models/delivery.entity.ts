import { BadRequestException } from '@nestjs/common';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  AfterUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryStatus } from '../lib/interfaces/delivery-status.enum';
import { Product } from './product.entity';
import { Stock } from './stock.entity';
import { Truck } from './truck.entity';
import { User } from './user.entity';
import { UserRoles } from '../lib/interfaces/user-role.enum';

@Entity()
export class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.CREATED,
  })
  status: DeliveryStatus;

  @Column('bool', { default: false })
  isDone: boolean;

  @Column('float')
  volume: number;

  @Column('datetime')
  deliveryDate: Date;

  @ManyToOne(() => Truck)
  truck: Truck;

  @ManyToOne(() => User)
  driver: User;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Stock)
  stock: Stock;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public canConfirm(user: User): boolean {
    return user.role === UserRoles.ADMIN || user.role === UserRoles.MANAGER;
  }

  @AfterUpdate()
  public async doneActions(): Promise<void> {
    if (this.isDone && this.status !== DeliveryStatus.CONFIRMED) return;

    this.stock.addGoods(this.volume);
    await this.stock.save();
    this.status = DeliveryStatus.DONE;
    this.save().then();
  }

  @BeforeUpdate()
  public checkIsDone(): void {
    if (this.isDone)
      throw new BadRequestException('Delivery is done, cannot be changed');
    if (this.status === DeliveryStatus.DONE)
      this.isDone = true;
  }
}
