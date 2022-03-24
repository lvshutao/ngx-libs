/* eslint-disable @angular-eslint/no-output-native */
import {Component, EventEmitter, Output} from "@angular/core";

import {MyAssets} from "my-tsbase";

import {MyNgxTcConfig} from "../config";
import {TencentCaptcha} from "./captcha.service";

@Component({
  selector: 'lib-tc-captcha',
  template: `
    <div style="display: inline;" (click)="bindShow()">
      <ng-content></ng-content>
    </div>
  `
})
export class LibTcCaptchaComponent {
  @Output() success = new EventEmitter<any>(); // 返回一个对象，与后端相对

  private tcCaptcha: TencentCaptcha;

  constructor(
    private conf: MyNgxTcConfig,
  ) {
    if (MyAssets.isEmpty(this.conf.captchaAppid)) {
      alert('腾讯验证码 appid 为空')
    }
    this.tcCaptcha = new TencentCaptcha(conf.captchaAppid);
  }

  bindShow() {
    this.tcCaptcha.bindShow(sec => {
      this.success.emit({sec});
    });
  }
}
