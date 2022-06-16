import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResListResult} from 'my-tsbase'

import {AppBaseConfig} from "../config";
import {HttpService} from "../util/http.service";
import {httpParams} from "../util/http";


@Injectable({providedIn: 'root'})
/**
 * 此方法仅限特点服务器接口使用
 */
export class AppHttpService {

  private http: HttpService;

  constructor(
    private conf: AppBaseConfig,
    private httpClient: HttpClient,
  ) {
    if (conf.debug) {
      console.log('app config:', conf);
    }
    this.http = new HttpService(conf.origin,httpClient)
  }


  /**
   * 搜索
   * @param path {string} 示例 xq/admin/opera
   * @param q {Object} 参数
   */
  search<T>(path: string, q?: any): Observable<ResListResult<T>> {
    return this.http.get(`/api/${path}/search`, httpParams(q));
  }

  /**
   * 列表显示
   * @param middle {string}
   * @param q {Object} 参数
   */
  list<T>(middle: string, q?: any): Observable<T[]> {
    return this.http.get(`/api/${middle}/list`, httpParams(q));
  }

  /**
   * 修改状态
   * @param middle {string} 示例 xq/admin/opera
   * @param id {number}
   * @param status {string}
   */
  changeStatus(middle: string, id: number, status: string): Observable<any> {
    return this.changeStatusWith(middle, {id, status});
  }

  /**
   * 修改状态
   */
  changeStatusWith(middle: string, data: any): Observable<any> {
    return this.http.put(`/api/${middle}/status`, data);
  }

  /**
   * 修改审核状态
   */
  changeState(middle: string, data: any): Observable<any> {
    return this.http.put(`/api/${middle}/state`, data);
  }

  /**
   * 查询记录
   */
  get<T>(middle: string, options = {}): Observable<T> {
    return this.http.get('/api/' + middle, options);
  }

  /**
   * 查询记录
   */
  getWithId<T>(middle: string, id: number): Observable<T> {
    return this.http.get(`/api/${middle}`, httpParams({id}));
  }

  /**
   * 查询记录
   */
  getWith<T>(middle: string, q?: any): Observable<T> {
    return this.http.get(`/api/${middle}`, httpParams(q));
  }

  // SAVE
  save<T>(isPut: boolean, middle: string, data: any): Observable<T> {
    return this.http.save(isPut, `/api/${middle}`, data);
  }

  // POST
  post<T>(middle: string, body: any, options = {}): Observable<T> {
    return this.http.post('/api/' + middle, body, options);
  }

  // PUT
  put<T>(middle: string, body: any, options = {}): Observable<T> {
    return this.http.put<T>('/api/' + middle, body, options);
  }

  // DELETE
  delete<T>(middle: string, q?:any): Observable<T> {
    return this.http.delete('/api/' + middle, httpParams(q));
  }

  deleteWithId<T>(middle: string, id: number): Observable<T> {
    return this.delete<T>(middle, {id});
  }
}
