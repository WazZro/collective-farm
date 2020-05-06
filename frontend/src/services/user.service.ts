import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../lib/classes/abstract-entity-service';
import { User } from '../models/user.model';
import { ApiRequestService } from './api.service';
import { environment } from '../environments/environment';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService extends AbstractEntityService<User> {
  user: User = null;

  constructor(api: ApiRequestService) {
    super(api, 'users', 1, User);
  }

  public async getCurrentUser(): Promise<User> {
    if (this.user) return this.user;

    try {
      let user = await this.apiService
        .createRequest<User>({
          url: `${environment.API}/v1/auth/me`,
          method: 'get',
        })
        .toPromise();

      user = plainToClass(User, user);
      this.user = user;
      return user;
    } catch (e) {
      return null;
    }
  }

  public async logIn(login: string, password: string): Promise<User> {
    try {
      const user = await this.apiService
        .createRequest<User>({
          url: `${environment.API}/v1/auth/login`,
          method: 'post',
          body: {
            login,
            password,
          },
        })
        .toPromise();

      this.user = plainToClass(User, user);
      return user;
    } catch (e) {
      return null;
    }

  }

  public async logOut(): Promise<void> {
    if (!this.user) return;

    await this.apiService
      .createRequest<User>({
        url: `${environment.API}/v1/auth/logout`,
        method: 'get',
      })
      .toPromise();
    this.user = null;
  }
}
