import {Component} from "@angular/core";
import {AbstractLoginComponent} from "./abstract";

@Component({
  selector: 'lib-login-btn-wxwork',
  template: `<a *ngIf="this.loginStateSer.isLogin; else login" mat-button color="warn" (click)="onLogout()">退出</a>
  <ng-template #login>
    <a mat-button (click)="openLogin()">登录</a>
  </ng-template>`
})
export class BtnLoginWxworkComponent extends AbstractLoginComponent {
  openLogin() {
    this.loginHttp.oauth3Work().subscribe(this.authSub);
  }
}
