import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../../models/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  public constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  public readOneByLogin(login: string): Promise<User> {
    return this.repo.findOne({
      where: [{ phone: login }],
    });
  }
}
