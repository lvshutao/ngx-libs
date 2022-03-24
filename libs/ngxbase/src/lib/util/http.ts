import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";
import {MyUrl} from "my-tsbase";

// 当响应数据为普通文本时，需要添加此配置

export const httpResponseText = {responseType: 'text'};

// 提交参数、返回格式为 text
export function httpTextParams(params: any) {
  return {responseType: 'text', params: params};
}

// 将数据放在 body 中，并且返回 text 数据
export function httpTextBody(data: any) {
  return {responseType: 'text', body: data};
}

// 将数据放在 body 中
export function httpBody(data: any) {
  return {body: data};
}

// 提交 query 参数
export function httpParams(params: any): any {
  return {params: params};
}

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: any;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export function navigateBy(router: Router, path: string, q: any = {}) {
  if (path.startsWith('http')) {
    router.navigateByUrl(MyUrl.appendQuery(path, q))
  } else {
    router.navigate([path], {})
  }
}
