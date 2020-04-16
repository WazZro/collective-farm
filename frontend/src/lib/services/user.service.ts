import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../classes/AbstractEntityService';
import { User } from '../models/user.model';
import { ApiRequestService } from './api.service';

@Injectable()
export class UserService extends AbstractEntityService<User> {
  constructor(api: ApiRequestService) {
    super(api, 'users', 1, User);
  }
}
