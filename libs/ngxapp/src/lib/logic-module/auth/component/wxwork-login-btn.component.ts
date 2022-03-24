import {Component} from "@angular/core";
import {AbstractLoginComponent} from "./abstract";
import {OauthSrc} from "../model";

@Component({
  selector: 'lib-wxwork-login-btn',
  template: `<a *ngIf="this.loginStateSer.isLogin; else login" mat-button color="warn" (click)="onLogout()">退出</a>
  <ng-template #login>
    <a mat-button (click)="openLogin()">登录</a>
  </ng-template>`
})
export class LibWxWorkSrcBtnComponent extends AbstractLoginComponent {
  openLogin() {
    this.http.getWith<OauthSrc>(this.apiConfig.authWxWork, {
      name: this.config.name,
    }).subscribe(res => {
      location.href = res.url;
    });
  }
}
