import { BadRequestException } from '@nestjs/common';
import {
  AfterUpdate,
  BaseEntity, BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import { DeliveryStatus } from '../lib/interfaces/delivery-status.enum';
import { Product } from './product.entity';
import { Stock } from './stock.entity';
import { Truck } from './truck.entity';
import { User } from './user.entity';
import { UserRoles } from '../lib/interfaces/user-role.enum';
import { DeliveryTypes } from '../lib/interfaces/delivery-type.enum';

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

  @Column({
    type: 'enum',
    enum: DeliveryTypes,
  })
  type: DeliveryTypes;

  @Column('bool', { default: false })
  isDone: boolean;

  @Column('float')
  @Min(0)
  volume: number;

  @Column('datetime')
  deliveryDate: Date;

  @ManyToOne(() => Truck, { eager: true })
  truck: Truck;

  @ManyToOne(() => User, { eager: true })
  driver: User;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Stock, { eager: true })
  stock: Stock;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public canConfirm(user: User): boolean {
    return user.role === UserRoles.ADMIN || user.role === UserRoles.MANAGER;
  }

  @BeforeInsert()
  public async createActions(): Promise<void> {
    if (this.type === DeliveryTypes.OUTCOMING) {
      this.stock.removeGoods(this.volume);
      await this.stock.save();
    }
  }

  @AfterUpdate()
  public async doneActions(): Promise<void> {
    if (!this.isDone && this.status !== DeliveryStatus.CONFIRMED) return;

    if (this.type === DeliveryTypes.INCOMING) {
      this.stock.addGoods(this.volume);
      await this.stock.save();
    }

    this.status = DeliveryStatus.DONE;
    this.save().then();
  }

  @BeforeUpdate()
  public checkIsDone(): void {
    if (this.isDone)
      throw new BadRequestException('Delivery is done, cannot be changed');
    if (this.status === DeliveryStatus.DONE) this.isDone = true;
  }
}
