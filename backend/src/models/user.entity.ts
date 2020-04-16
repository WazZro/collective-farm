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
} from 'typeorm';
import { ARGON_HASHING_THREADS, ARGON_HASHING_TIME } from '../lib/constants';
import { UserDto } from '../lib/dto/user.dto';
import { UserRoles } from '../lib/interfaces/user-role.enum';

@Entity('users')
@Index(['firstName', 'lastName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ nullable: true })
  public middleName: string;

  @Column()
  @Index({ unique: true })
  public phone: string;

  @Column('date')
  public birthDate: Date;

  @Column('date')
  public startWorkDate: Date;

  @Column('date', { nullable: true })
  public endWorkDate: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  private password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRoles,
  })
  public role: UserRoles;

  public constructor(dto?: UserDto) {
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
