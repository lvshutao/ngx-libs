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
import {AlterService} from "../provider/alter.service";

interface AppResp {
  code: number; // 业务代码，当不为 0 时，通常表示错误
  msg: string; // 提示信息
  data: any;
}

@Injectable({providedIn: 'root'})
export class ResponseJsonInterceptor implements HttpInterceptor {

  constructor(
    private alter: AlterService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        console.log('请求地址错误:', e);
        // throw new HttpErrorResponse({error: e.statusText, status: e.status, statusText: e.statusText});
        const msg = e.message || e.statusText
        this.alter.danger(msg)
        return throwError(msg);
      }),
      map(event => {
        if (event instanceof HttpResponse) {
          // console.log('ResponseJsonInterceptor', event.body)
          const rs = typeof event.body === 'string' ? JSON.parse(event.body) as AppResp : event.body as AppResp;
          if (rs.code > 0) {
            this.alter.danger(rs.msg || '请求出错，请稍后再试')
            throw new HttpErrorResponse({error: rs.msg, status: rs.code, statusText: rs.msg});
          }
          return event.clone({body: rs.data});
        }
        return event;
      })
    );
  }
}
