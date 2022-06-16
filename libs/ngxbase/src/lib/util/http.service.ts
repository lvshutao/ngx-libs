import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class HttpService {

  constructor(public origin: string, public http: HttpClient) {
  }

  get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(this.origin + url, options)
  }

  post<T>(url: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(this.origin + url, body, options)
  }

  put<T>(url: string, body: any, options = {},): Observable<T> {
    return this.http.put<T>(this.origin + url, body, options)
  }

  delete<T>(url: string, options = {}): Observable<T> {
    return this.http.delete<T>(this.origin + url, options)
  }

  save<T>(isPut: boolean, url: string, body: any, options = {}): Observable<T> {
    if (isPut) {
      return this.put<T>(url, body, options);
    } else {
      return this.post<T>(url, body, options);
    }
  }
}
