import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async validateUser(login: string, password: string): Promise<User> {
    const requestedUser = await this.userService.readOneByLogin(login);
    if (requestedUser && (await requestedUser.comparePassword(password)))
      return requestedUser;

    return null;
  }

  public logOut(request: Request): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      request.session.destroy((err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
}
