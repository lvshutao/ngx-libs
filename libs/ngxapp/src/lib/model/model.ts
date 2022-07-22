// 认证返回
export interface OauthSrc {
  url: string;
}


// 微信网页
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
// 企业微信
// https://work.weixin.qq.com/api/doc/90000/90135/91019
export interface WxSelfQrResp {
  appid: string; // cropId
  agentid: string;
  redirect_url: string;
  state: string;
}

/**
 * 临时凭证
 */
export class TmpCert {
  uid = '';
  user_sign = '';
  app_name = '';
  app_sign = '';
}

/**
 * 用户登录凭证
 */
export class UserCert {
  access_token = '';
  access_expire = 0;
  refresh_after = 0;
  uid = '';
}

export class UserBase {
  uid = '';
  is_phone_valid = false;
  is_email_valid = false;
  avatar = '';
  nickname = '';
  checked = false;
  status = '';
}

export interface Setting {
  id: number;
  gname: string;
  title: string;
  name: string;
  tag: number;
  is_open: boolean;
  is_lock: boolean;
  content: string;
}
