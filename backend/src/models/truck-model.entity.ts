import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('truck_models')
export class TruckModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public brand: string;

  @Column()
  public model: string;

  @Column('int')
  public buildYear: number;

  @Column('int')
  public capacity: number;
}
