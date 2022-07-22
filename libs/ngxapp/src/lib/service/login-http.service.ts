import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {MyBrowser} from "my-tsbase";
import {AppBaseConfig, AppHttpService} from "@fsl/ngxbase";

import {MyAppxAuthConfig} from "../config/auth-config";
import {MyAppxApiConfig} from "../config/api-config";
import {OauthSrc, Setting, TmpCert, UserCert} from "../model/model";



@Injectable({providedIn: 'root'})
export class LoginHttpService {

  constructor(private http: AppHttpService,
              private config: MyAppxApiConfig,
              private appConfig: AppBaseConfig,
              private authConfig: MyAppxAuthConfig,) {
  }

  /**
   * 账号密码登录
   * @param data
   */
  login(data: any): Observable<UserCert> {
    return this.http.post<UserCert>(this.config.login, data);
  }

  /**
   * 无密登录，发送账号验证码
   * @param data
   */
  noPwdLoinCode(data: any): Observable<string> {
    return this.http.post(this.config.autoLoginCode, data);
  }

  /**
   * 无密登录，账号+验证码
   * @param data
   */
  noPwdLogin(data: any): Observable<UserCert> {
    return this.http.post<UserCert>(this.config.autoLogin, data);
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

  /**
   * 微信登录
   */
  oauth3Wechat(): Observable<OauthSrc> {
    return this.http.getWith<OauthSrc>(this.config.authWechat, {
      name: this.appConfig.name,
      gzh: MyBrowser.isWeiXin(),
      appid: MyBrowser.isWeiXin() ? this.authConfig.wechatGzhAppid : this.authConfig.wechatWebAppid,
      return: true,
    })
  }

  /**
   * 企业微信登录
   */
  oauth3Work(): Observable<OauthSrc> {
    return this.http.getWith<OauthSrc>(this.config.authWxWork, {
      name: this.appConfig.name,
      appid: this.authConfig.workAppid,
      return: true,
    });
  }
}
