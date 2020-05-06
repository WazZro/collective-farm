import * as Argon from 'argon2';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ARGON_HASHING_THREADS, ARGON_HASHING_TIME } from '../lib/constants';
import { UserDto } from '../lib/dto/user.dto';
import { UserRoles } from '../lib/interfaces/user-role.enum';
import { Truck } from './truck.entity';

@Entity('users')
@Index(['firstName', 'lastName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  @Index({ unique: true })
  phone: string;

  @Column('date')
  birthDate: Date;

  @Column('date')
  startWorkDate: Date;

  @Column('date', { nullable: true })
  endWorkDate: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  private password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRoles,
  })
  role: UserRoles;

  @ManyToMany(() => Truck, truck => truck.drivers)
  trucks: Truck[];

  constructor(dto?: UserDto) {
    super();
    if (dto) Object.assign(this, dto);
  }

  /**
   * Compare given password with user's hashed password
   * @param password - plain password for compare
   */
  public comparePassword(password: string): Promise<boolean> {
    return Argon.verify(this.password, password);
  }

  /**
   * Method for changing password
   * @param newPassword new password string
   */
  public async changePassword(newPassword: string): Promise<void> {
    this.password = newPassword;
    await this.passwordHashing();

    await this.save();
  }

  @BeforeInsert()
  protected async beforeInsert(): Promise<void> {
    await this.passwordHashing();
  }

  /**
   * Hash password using Argon2
   */
  protected async passwordHashing(): Promise<void> {
    this.password = await Argon.hash(this.password, {
      type: Argon.argon2id,
      parallelism: ARGON_HASHING_THREADS,
      timeCost: ARGON_HASHING_TIME,
    });
  }
}
