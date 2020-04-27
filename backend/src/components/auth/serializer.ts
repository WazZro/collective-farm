import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';

@Injectable()
export class Serializer extends PassportSerializer {
  public serializeUser(user: User, done: Function): void {
    done(null, user);
  }

  public deserializeUser(payload: any, done: Function): void {
    done(null, payload);
  }
}
