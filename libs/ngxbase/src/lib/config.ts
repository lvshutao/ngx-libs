import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class AppBaseConfig {
  /**
   * 当前应用名称
   */
  name = 'demo';
  /**
   * 站点名称
   */
  title = '标题';
  /**
   * 是否开启调试
   */
  debug = false;
  /**
   * AppHttpService 请求站点源
   */
  origin = '';
  /**
   * 手动拼接认证凭证，默认 false, 则凭证存储在 cookie 或者 session 中
   */
  manualToken = false;
  /**
   * 需要授权的域名 manualToken=true 时才会使用
   */
  tokenDomains = new Array<string>();

}
