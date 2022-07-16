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

// 设置
export interface Setting {
  name: string;
  group: string;
  title: string;
  content: string;
  open: boolean;
}
