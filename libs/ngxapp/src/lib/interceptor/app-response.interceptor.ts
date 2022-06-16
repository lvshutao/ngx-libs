import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AppBaseConfig} from "@fsl/ngxbase";

import {ResponseCallbackService} from "../service/response-callback.service";

@Injectable({providedIn: 'root'})
/**
 * 根据状态码处理结果
 */
export class AppResponseInterceptor implements HttpInterceptor {
  constructor(
    private conf: AppBaseConfig,
    private callback: ResponseCallbackService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.conf.debug) {
          console.log('response error:', {code: error.status, message: error.error,});
        }
        if (error.status === 401) {
          this.callback.status401(req.url);
        }
        return throwError(error);
      }));
  }
}
