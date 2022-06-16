import {Injectable} from "@angular/core";

import {MyAssets, MyCache} from 'my-tsbase'
import {UserCert} from "../model/cert.model";

export const KEY_USER_CERT = 'cert';

@Injectable({providedIn: 'root'})
/**
 * 用户登录凭证
 */
export class CertService {
  private cache = new MyCache(KEY_USER_CERT);
  private cert = new UserCert();

  constructor() {
    this.cert = this.cache.read();
  }

  /**
   * 退出登录
   */
  logout() {
    this.cache.clean();
    // @ts-ignore
    this.cert = null;
  }

  /**
   * 保存凭证
   */
  saveCert(cert: UserCert): boolean {
    if (MyAssets.isEmpty(cert.accessToken)) {
      console.error('保存登录凭证时错误', cert)
      return false;
    }

    this.cache.write(cert)
    this.cert = cert;
    return true;
  }

  /**
   * 生成请求签名
   */
  headerToken(): string | null {
    return this.cert?.accessToken;
  }

}
