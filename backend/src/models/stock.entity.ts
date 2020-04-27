import { BadRequestException } from '@nestjs/common';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Min } from 'class-validator';
import { Product } from './product.entity';

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  @Min(0)
  capacity: number;

  @Column('int')
  @Min(0)
  congestion: number;

  @ManyToOne(() => Product, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  product: Product;

  @BeforeInsert()
  @BeforeUpdate()
  public checkCapacity(): void {
    if (this.congestion > this.capacity)
      throw new BadRequestException('Congestion cannot be more than capacity');
  }

  public addGoods(amount: number): void {
    if (this.congestion + amount > this.capacity)
      throw new BadRequestException('Congestion cannot be more than capacity');

    this.congestion += amount;
  }

  public removeGoods(amount: number): void {
    if (this.congestion - amount < 0)
      throw new BadRequestException('Not enough goods on the stock');

    this.congestion -= amount;
  }
}
