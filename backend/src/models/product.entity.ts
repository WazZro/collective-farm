import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column('float')
  cost: number;

  unit: string;
}
