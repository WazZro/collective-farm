import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';

@Injectable()
export class Serializer extends PassportSerializer {
  serializeUser(user: User, done: Function): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: Function): any {
    done(null, payload);
  }
}
