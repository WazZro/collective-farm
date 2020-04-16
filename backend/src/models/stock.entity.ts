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
import { Product } from './product.entity';

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public capacity: number;

  @Column('int')
  public congestion: number;

  @ManyToOne(() => Product, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  public product: Product;

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
}
