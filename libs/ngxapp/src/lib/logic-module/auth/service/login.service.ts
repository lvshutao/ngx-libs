import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {AppHttpService} from "@fsl/ngxbase";

import {Setting} from "../model";
import {TmpCert, UserCert} from "../../../model/cert.model";
import {MyAppxApiConfig} from "../../api-config";

@Injectable({providedIn:'root'})
export class LoginHttpService {

  constructor(private http: AppHttpService, private config: MyAppxApiConfig) {
  }

  /**
   * 账号密码登录
   * @param data
   */
  login(data: any): Observable<TmpCert> {
    return this.http.post<TmpCert>(this.config.login, data);
  }

  /**
   * 无密登录，发送账号验证码
   * @param data
   */
  noPwdLoinCode(data: any): Observable<string> {
    return this.http.postResText(this.config.autoLoginCode, data);
  }

  /**
   * 无密登录，账号+验证码
   * @param data
   */
  noPwdLogin(data: any): Observable<TmpCert> {
    return this.http.post<TmpCert>(this.config.autoLogin, data);
  }

  /**
   * 读取配置
   */
  setting(): Observable<Setting[]> {
    return this.http.get(this.config.openSetting);
  }

  /**
   * 临时凭证换登录凭证
   */
  cert(tc: TmpCert): Observable<UserCert> {
    return this.http.post(this.config.loginCert, tc);
  }
}
