import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {Observable} from "rxjs";
import {AppBaseConfig} from "@fsl/ngxbase";

import {CertService} from "../service/cert.service";

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private certSer: CertService, private config: AppBaseConfig) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.config.manualToken) {
      const host = new URL(req.url).host;
      if (this.config.debug) {
        console.log('host:', host, 'useToken?:', this.config.tokenDomains.includes(host))
      }
      if (this.config.tokenDomains && this.config.tokenDomains.includes(host)) {
        const token = this.certSer.headerToken();
        if (token) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', token)
          });
          return next.handle(authReq);
        }
      }
    }
    return next.handle(req);
  }
}

/*
providers:[
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
]
 */
