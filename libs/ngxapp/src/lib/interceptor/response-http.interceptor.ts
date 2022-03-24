import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";

import {CertService} from "../service/cert.service";
import {ResponseCallbackService} from "../service/response-callback.service";

interface Resp {
  code: number; // 业务代码，当不为 0 时，通常表示错误
  message: string; // 提示信息
  data: any;
}

@Injectable({providedIn: 'root'})
/**
 * 处理请求结果
 */
export class ResponseHttpInterceptor implements HttpInterceptor {
  constructor(
    private certSer: CertService,
    private callback: ResponseCallbackService,
  ) {
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
            const rs = event.body as Resp;
            if (rs.code === 401) {
              this.callback.status401(req.url);
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
