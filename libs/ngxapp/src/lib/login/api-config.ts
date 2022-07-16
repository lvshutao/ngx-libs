import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MyAppxApiConfig {
  /**
   * 退出登录
   */
  logout = 'base/open/logout';
  /**
   * API 服务器连接
   */
  ping = 'base/open/ping'

  /**
   * API 微信登录地址
   */
  authWechat = 'base/wx/oauth/wechat/src';
  /**
   * API 企业微信登录地址
   */
  authWxWork = 'base/wx/oauth/work/src'
  /**
   * API 用户登录
   */
  login = 'base/open/login';
  /**
   * API 自动登录
   */
  autoLogin = 'base/open/auto-login';
  /**
   * API 自动登录验证码
   */
  autoLoginCode = 'base/open/auto-login/code';
  /**
   * API 读取配置
   */
  openSetting = 'base/open/setting';
  /**
   * 临时凭证换取登录凭证
   */
  loginCert = 'base/open/cert';
  /**
   * 验证码 ID
   */
  captchaId = 'base/open/captcha-id';
  /**
   * 验证码图片地址
   */
  captchaSrc = '/api/base/open/captcha';

  /**
   * 用户能否访问
   */
  userAccess = 'base/user/access'
}

