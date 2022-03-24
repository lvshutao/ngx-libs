import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MyAppxRouteConfig {
  /**
   * Router path 登录界面地址
   */
  login = '/auth/login'
  /**
   * 用户协议
   */
  terms = '/page/terms';
  /**
   * 首页
   */
  home = '/';

  userIndex = '/user'
}
