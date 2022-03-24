import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

import {MyAssets} from "my-tsbase";
import {AppBaseConfig, AppHttpService} from "@fsl/ngxbase";

import {MyAppxApiConfig} from "../../api-config";

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
export class ImageCaptchaDialog implements OnInit {

  private id = '';
  src = '';
  code = '';

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ImageCaptchaDialog>,
    private http: AppHttpService,
    private appConfig: AppBaseConfig,
    private apiConfig: MyAppxApiConfig,
  ) {
  }

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.code = '';
    this.http.get<any>(this.apiConfig.captchaId, {id: this.id}).subscribe((id: string) => {
      this.id = id;
      this.src = this.appConfig.origin + this.apiConfig.captchaSrc + '?id=' + id + '&rnd=' + Math.random();
    })
  }


  get disabled() {
    return !(this.id != '' && MyAssets.isCaptcha(this.code));
  }

  onSubmit() {
    this.ref.close({id: this.id, code: this.code});
  }
}
