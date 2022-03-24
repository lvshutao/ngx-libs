import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CredentialsInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 跨域 cookie 支持
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request);
  }
}
