/* eslint-disable prefer-destructuring */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.entity';
import { UserRoles } from '../interfaces/user-role.enum';
import {
  PRIVATE_META_KEY,
  PrivateMetadata,
} from '../decorators/private.decorator';

@Injectable()
export class PrivateFieldInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const body = request.body;

    if (user?.role === UserRoles.ADMIN) return next.handle();
    if (body) PrivateFieldInterceptor.privateFieldInputProcess(body, user);
    return this.streamProcess(next.handle(), user);
  }

  private streamProcess(
    stream: Observable<any>,
    user: User,
  ): Observable<unknown> {
    return stream.pipe(
      map((value) => {
        if (!value || typeof value !== 'object') return value;
        if (Array.isArray(value)) {
          value.forEach((v) => {
            PrivateFieldInterceptor.privateFieldOutputProcess(v, user);
            return v;
          });
        } else PrivateFieldInterceptor.privateFieldOutputProcess(value, user);

        return value;
      }),
    );
  }

  private static privateFieldInputProcess(value: any, user: User): void {
    const privateFieldMetadatas: PrivateMetadata[] = Reflect.getMetadata(
      PRIVATE_META_KEY,
      value,
    );
    if (privateFieldMetadatas) {
      for (const metadata of privateFieldMetadatas) {
        if (!metadata.meta) continue;
        const canEdit = metadata.meta.allowRoles.includes(user?.role);

        if (!canEdit) Reflect.deleteProperty(value, metadata.key);
      }
    }
  }

  private static privateFieldOutputProcess(value: any, user: User): void {
    const privateFieldMeta: PrivateMetadata[] = Reflect.getMetadata(
      PRIVATE_META_KEY,
      value,
    );
    if (privateFieldMeta)
      for (const metadata of privateFieldMeta) {
        if (!metadata.meta || metadata.meta.canSee) continue;
        const canSee = metadata.meta.allowRoles.includes(user?.role);

        if (!canSee) Reflect.deleteProperty(value, metadata.key);
      }
  }
}
