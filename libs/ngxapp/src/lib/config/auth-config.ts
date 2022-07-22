import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MyAppxAuthConfig {
  wechat = true; // 微信登录
  work = false; // 企业微信登录
  google = false; // 谷歌登录

  wechatGzhAppid = ''; // 微信公众号 appid
  wechatWebAppid = ''; // 网页登录 appid
  workAppid = '';
}
