import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

interface AppResp {
  code: number; // 业务代码，当不为 0 时，通常表示错误
  message: string; // 提示信息
  data: any;
}

@Injectable({providedIn: 'root'})
export class AppResponseInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        console.log('response err:', e);
        // throw new HttpErrorResponse({error: e.statusText, status: e.status, statusText: e.statusText});
        return throwError(e.statusText || e.message);
      }),
      map(event => {
        if (event instanceof HttpResponse) {
          if (typeof event.body === 'object') {
            const rs = event.body as AppResp;
            if (rs.code === 401) {
              console.warn('todo: response 404, destroy local user token');
            } else if (rs.code > 0) {
              throw new HttpErrorResponse({error: rs.message, status: rs.code, statusText: rs.message});
            }
            return event.clone({body: rs.data});
          } else {
            console.log('ResponseInterceptor, httpResponse:body:', typeof event.body, event.body);
            console.warn('目前服务响应的都是 object, 如果在 http 请求时指定了响应格式为 text 则可能导致解析错误');
          }
        }
        return event;
      })
    );
  }
}
