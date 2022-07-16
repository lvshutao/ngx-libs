import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {MyAssets} from "my-tsbase";
import {AppHttpService} from "@fsl/ngxbase";

export interface ImageCaptchaConfig {
  /**
   * 获取 captchaId 接口路径，如 base/open/captcha-id (通过 http 请求，隐藏了前缀 /api)
   */
  captchaId: string
  /**
   * 图片显示路径，如 /api/base/open/captcha
   */
  captchaSrc: string
}

/**
 * 图片验证码
 */
@Component({
  template: `
    <div mat-dialog-title>验证码</div>
    <div mat-dialog-content>
      <div style="font-size: small;color: orangered;">有效期1分钟,点击刷新</div>

      <div style="width: 240px;height: 80px;">
        <img style="width: 100%;"
             alt="验证码"
             [src]="src" (click)="onReload()">
      </div>
      <mat-form-field style="width: 240px;" floatLabel="never">
        <input matInput name="code" autoComplete="off"
               [(ngModel)]="code" style="text-align:center">
        <a matSuffix mat-icon-button aria-label="Clear" (click)="code=''">
          <mat-icon>close</mat-icon>
        </a>
        <mat-hint>请填写验证码</mat-hint>
      </mat-form-field>

      <div class="center pt8">
        <a mat-button color="primary" [disabled]="disabled" (click)="onSubmit()">确定</a>
      </div>
    </div>
  `
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class DialogImageCaptcha implements OnInit {

  private id = '';
  src = '';
  code = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageCaptchaConfig,
    private fb: FormBuilder,
    private ref: MatDialogRef<DialogImageCaptcha>,
    private http: AppHttpService,
  ) {
  }

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.code = '';
    this.http.getWith<{ id: string }>(this.data.captchaId, {id: this.id}).subscribe(rst => {
      this.id = rst.id;
      this.src = this.http.origin + this.data.captchaSrc + '?id=' + rst.id + '&rnd=' + Math.random();
      // console.log('src:',this.src)
    })
  }


  get disabled() {
    return !(this.id != '' && MyAssets.isCaptcha(this.code));
  }

  onSubmit() {
    this.ref.close({id: this.id, code: this.code});
  }
}
