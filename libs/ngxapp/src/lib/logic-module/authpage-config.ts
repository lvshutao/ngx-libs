import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MyAppxAuthPageConfig {
  wechat = true; // 微信登录
  work = false; // 企业微信登录
  google = false; // 谷歌登录
}
