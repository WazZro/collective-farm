// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable, from, throwError } from 'rxjs';
// import { tap, catchError, switchMap } from 'rxjs/operators';
// import { UsersService } from '../../services/users.service';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private userService: UsersService) {}
//
//   public intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler,
//   ): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error) => {
//         if (error.status === 401) {
//           if (
//             req.url.includes('login') ||
//             req.url.includes('refresh-token') ||
//             req.url.includes('logout')
//           ) {
//             this.userService.logOut(false);
//             return throwError(error);
//           }
//
//           return from(this.userService.refreshToken()).pipe(
//             switchMap(() => {
//               req = req.clone();
//               return next.handle(req);
//             }),
//             catchError((err) => {
//               return throwError(err);
//             }),
//           );
//         }
//
//         return throwError(error);
//       }),
//     );
//   }
//
//   private async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const token = this.getCookie('gc_token');
//     const payload = this.parseJwt(token);
//     const isExpired = this.isTokenExpired(payload);
//
//     if (isExpired) {
//       await this.userService.refreshToken();
//     }
//
//     return next.handle(req);
//   }
//
//   private getCookie(name: string): string {
//     let matches = document.cookie.match(
//       new RegExp(
//         '(?:^|; )' +
//           name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
//           '=([^;]*)',
//       ),
//     );
//     return matches ? decodeURIComponent(matches[1]) : undefined;
//   }
//
//   private parseJwt(token: string): Object {
//     const payload = token.split('.')[1];
//     // const meta = token.split(".")[2];
//
//     return this.base64decode(payload);
//   }
//
//   private base64decode(str: string) {
//     const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
//     const json = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(function (c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join(''),
//     );
//
//     return JSON.parse(json);
//   }
//
//   private isTokenExpired(meta: any) {
//     const now = new Date();
//     const expiredDate = new Date(meta.exp);
//     if (expiredDate.getTime() < now.getTime()) return true;
//     return false;
//   }
// }
