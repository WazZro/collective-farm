import { MigrationInterface } from 'typeorm';
import { User } from '../models/user.entity';
import { UserRoles } from '../lib/interfaces/user-role.enum';

export class InitialData1564132613702 implements MigrationInterface {
  public async up(): Promise<any> {
    const admin = new User();
    admin.role = UserRoles.ADMIN;
    admin.firstName = 'Владимир';
    admin.lastName = 'Путин';
    admin.middleName = 'Владимирович';
    admin.phone = '+79000000000';
    admin.birthDate = new Date(1948, 1, 1);
    admin.startWorkDate = new Date(2012, 12, 21);
    (admin as any).password = '123123';

    await admin.save();
  }

  public down(): Promise<any> {
    return null;
  }
}
