import {Component, Input} from "@angular/core";

import {navigateBy} from '@fsl/ngxbase'
import {AbstractLoginComponent} from "./abstract";

@Component({
  selector: 'lib-login-btn',
  template: `<a mat-button *ngIf="!loginStateSer.isLogin; else out" (click)="gotoLogin()">登录</a>
  <ng-template #out>
    <a *ngIf="logoutBtn" mat-button color="warn" (click)="onLogout()">退出</a>
  </ng-template>
  `
})
export class LoginBtnComponent extends AbstractLoginComponent {
  @Input() logoutBtn = false;
  gotoLogin() {
    navigateBy(this.router, this.routeConfig.login)
  }
}
