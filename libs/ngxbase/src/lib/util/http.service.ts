import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

import {HandlerError, HttpErrorService} from "../service/http-error.service";
import {HttpOptions} from "./http";

export class HttpService {

  private readonly handleError: HandlerError;
  private origin = '';

  constructor(private name: string, public http: HttpClient, private httpErr: HttpErrorService) {
    this.handleError = this.httpErr.createHandleError(this.name);
  }

  setOrigin(origin: string) {
    this.origin = origin;
  }

  get<T>(url: string, options?: HttpOptions | any, defaultRes: any = null): Observable<T> {
    return this.http.get<T>(this.origin + url, options).pipe(
      catchError(this.handleError('GET', url, defaultRes))
    );
  }

  post<T>(url: string, body: any | null, options = {}, defaultRes: any = null): Observable<T> {
    // @ts-ignore
    return this.http.post(this.origin + url, body, options).pipe(catchError(this.handleError('POST', url, defaultRes)));
  }

  put<T>(url: string, body: any | null, options = {}, defaultRes: any = null): Observable<T> {
    return this.http.put<T>(this.origin + url, body, options).pipe(catchError(this.handleError('PUT', url, defaultRes)));
  }

  delete<T>(url: string, options = {}, defaultRes: any = null): Observable<T> {
    // @ts-ignore
    return this.http.delete(this.origin + url, options).pipe(catchError(this.handleError('DELETE', url, defaultRes)));
  }

  save<T>(isPut: boolean, url: string, body: any | null, options = {}): Observable<T> {
    if (isPut) {
      return this.put<T>(url, body, options);
    } else {
      return this.post<T>(url, body, options);
    }
  }
}
