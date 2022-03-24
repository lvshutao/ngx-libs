import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {AlterService} from '../provider/alter.service';

export type HandlerError = (operation: string, url: string, result: any) =>
  (error: HttpErrorResponse) => Observable<any>;

// 处理 HttpClient 错误
@Injectable({providedIn: 'root'})
export class HttpErrorService {

  constructor(public alert: AlterService,) {
  }


  createHandleError = (serviceName: string) =>
    (operation = 'operation', url: string, result = {}) =>
      this.handlerError(serviceName, url, operation, result);

  // result 错误时的默认值
  // 服务端必须返回 json，如果返回 text 之类的，可能会导致这里直接报错
  // serviceName:当前服务名称； operation: 服务操作； result 错误后返回的默认值
  handlerError(serviceName: string, url: string, operation = 'operation', result: any) {
    return (error: HttpErrorResponse): Observable<any> => {
      console.warn('|<==== http response error with url:', url);
      console.warn('name:[', serviceName, '], operation:[', operation, ']');
      let message = '出错啦';
      const t = typeof error.error;
      if (t === 'string') {
        message = error.error;
      }
      this.alert.danger(message);
      throw error;
      // return of(result); // 返回默认值
    };
  }

}
