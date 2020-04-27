import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TruckModel } from './truck-model.entity';
import { User } from './user.entity';

@Entity()
export class Truck extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: string;

  @ManyToOne(() => TruckModel, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  model: TruckModel;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  drivers: User[];
}
