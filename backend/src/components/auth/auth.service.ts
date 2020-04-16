import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.entity';

@Injectable()
export class AuthService {
  public constructor(private userService: UserService) {}

  public async validateUser(login: string, password: string): Promise<User> {
    const requestedUser = await this.userService.readOneByLogin(login);

    if (requestedUser && (await requestedUser.comparePassword(password)))
      return requestedUser;

    return null;
  }
}
