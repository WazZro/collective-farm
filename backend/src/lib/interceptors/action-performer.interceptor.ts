import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ActionPerformerInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    callHandler: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.raw) {
      if (request.raw.method === 'POST') request.body.createdBy = request.user;
      else if (request.raw.method === 'PATCH' || request.raw.method === 'PUT')
        request.body.updatedBy = request.user;
    }

    return callHandler.handle();
  }
}
