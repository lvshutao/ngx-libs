import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

// 服务端响应格式（腾讯）
interface TcResp {
  code: number;
  msg: string;
}

@Injectable({providedIn: 'root'})
export class TcResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(
        event => {
          if (event instanceof HttpResponse) {
            // console.log('typeof body = ', typeof event.body);
            if (typeof event.body === 'string') {
              const tr = JSON.parse(event.body) as TcResp;
              // console.log('response code is empty?', tr.code);
              if (tr.code !== 0) {
                throw new HttpErrorResponse({
                  error: tr.msg,
                  status: tr.code,
                  statusText: tr.msg,
                });
              }
            } else {
              // console.log(event.body);
              const code = event.body.code || 0;
              if (code !== 0 && code !== 200) {
                throw new HttpErrorResponse({
                  error: event.body.msg,
                  status: code,
                  statusText: event.body.msg,
                });
              }
            }
            const isList = event.body.data != null && event.body.data.total !== undefined;
            // console.log('is response list:', isList);
            if (isList) {
              return event.clone({
                body: {
                  total: event.body.data.total,
                  rows: event.body.data.list,
                }
              });
            } else {
              return event.clone({
                body: event.body.data,
              });
            }
          }
          return event;
        },
      ),
      catchError((error: HttpErrorResponse) => {
        const data = {
          code: error.status,
          message: error.error,
        };
        console.log('error:', data);
        return throwError(error);
      })
    );
  }
}
