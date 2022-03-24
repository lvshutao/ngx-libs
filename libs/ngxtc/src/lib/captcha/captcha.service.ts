/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MyHtml } from "my-tsbase";

export interface TencentCaptchaRst {
  ret: number; // 0 验证成功，2：用户主动关闭验证码
  ticket: string; // 票据，仅当 ret == 0 时，才有值
  randstr: string; // 本次验证的随机串，请求后台接口时需要带上
  appid: string; // 场景值
  bizState?: any; // 自定义透传参数
}

interface TencentCaptchaObj {

  show(): void; // 显示验证码
  destroy(): void; // 隐藏验证码
  getTicket(): TencentCaptchaRst; // 验证成功后获取验证码
}

export class TencentCaptcha {
  constructor(private appid: string) {
    // https://cloud.tencent.com/document/product/1110/36841
    MyHtml.appendJsFile('https://ssl.captcha.qq.com/TCaptcha.js');
    if (this.appid == '') {
      alert('tencent captcha appid is empty');
      return;
    }
  }


  public bizState = ''; // 透传参数
  public width = 0; // 实际显示宽度，通常为手机端使用
  public height = 0; // 实际显示高度


  bindShow(success: (res: TencentCaptchaRst) => void) {
    const options = Object.assign({},
      this.bizState ? { bizState: this.bizState } : {},
      this.width > 0 && this.height > 0 ? { sdkView: { width: this.width, height: this.height } } : {},
    );
    // @ts-ignore
    const captcha1: TencentCaptchaObj = new TencentCaptcha(this.appid, (res: TencentCaptchaRst) => {
      if (res.ret == 0) {
        success(res);
      }
    }, options);
    captcha1.show(); // 显示验证码
  }
}
