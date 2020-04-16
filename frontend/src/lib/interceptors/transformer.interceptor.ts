// import { Injectable } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
// } from '@angular/common/http';
// import { plainToClass } from 'class-transformer';
// import { map } from "rxjs/operators";
// import { User } from '../models/user.model';
// import { Observable } from 'rxjs';

// @Injectable()
// export class ClassTransformInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
//     return next.handle(req).pipe(
//       map(value => {
//         return plainToClass(User, value);
//     }));
//   }
// }
