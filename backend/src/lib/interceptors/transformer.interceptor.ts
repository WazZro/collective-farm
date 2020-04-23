import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((value) => {
        let isPaginable = false;
        const backup = value;
        if (!value || typeof value !== 'object') return value;

        if (value.page && value.pageCount && value.total && value.count) {
          value = value.data;
          isPaginable = true;
        }
        value = classToPlain(value, { excludePrefixes: ['_'] });

        if (isPaginable) {
          backup.data = value;
          value = backup;
        }
        return value;
      }),
    );
  }
}
