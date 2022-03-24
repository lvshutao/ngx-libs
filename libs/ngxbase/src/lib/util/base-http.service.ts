import {Observable} from "rxjs";

import {HttpService} from "./http.service";
import {HttpOptions} from "./http";


export class BaseHttpService {
  constructor(private origin: string, public http: HttpService) {
    if (origin.trim() == '') {
      console.error('app http param error: origin is empty');
    }
  }

  get<T>(path: string, options?: HttpOptions | any): Observable<T> {
    return this.http.get(this.origin + path, options);
  }

  save<T>(isPut: boolean, path: string, body: any | null, options = {}): Observable<T> {
    return this.http.save(isPut, this.origin + path, body, options);
  }

  post<T>(path: string, body: any | null, options = {}): Observable<T> {
    return this.http.post(this.origin + path, body, options);
  }

  put<T>(path: string, body: any | null, options = {}): Observable<T> {
    return this.http.put(this.origin + path, body, options);
  }

  delete<T>(path: string, options = {}): Observable<T> {
    return this.http.delete(this.origin + path, options);
  }
}
