import {Injectable} from "@angular/core";
import {AppBaseConfig} from "@fsl/ngxbase";

import {CertService} from "./cert.service";

@Injectable({providedIn: 'root'})
export class ResponseCallbackService {
  constructor(
    private certSer: CertService,
    private config: AppBaseConfig,
  ) {
  }

  status401(url: string) {
    console.warn('response 401, destroy local user token:', url);
    this.certSer.logout();
    // 跳转到登录页
  }
}
