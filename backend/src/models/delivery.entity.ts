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
  public id: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.CREATED,
  })
  public status: DeliveryStatus;

  @Column('bool', { default: false })
  public isDone: boolean;

  @Column('float')
  public volume: number;

  @Column('datetime')
  public deliveryDate: Date;

  @ManyToOne(() => Truck)
  public truck: Truck;

  @ManyToOne(() => User)
  public driver: User;

  @ManyToOne(() => Product)
  public product: Product;

  @ManyToOne(() => Stock)
  public stock: Stock;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public canConfirm(user: User): boolean {
    if (user.role === UserRoles.ADMIN || user.role === UserRoles.MANAGER)
      return true;
    return false;
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
