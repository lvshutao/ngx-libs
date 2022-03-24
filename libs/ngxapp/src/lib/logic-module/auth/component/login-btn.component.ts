import {Component, Input} from "@angular/core";

import {navigateBy} from '@fsl/ngxbase'
import {AbstractLoginComponent} from "./abstract";

@Component({
  selector: 'lib-login-btn',
  template: `<a mat-button *ngIf="!loginStateSer.isLogin; else out" (click)="gotoLogin()">登录</a>
  <ng-template #out>
    <a *ngIf="showLogout" mat-button color="warn" (click)="onLogout(true)">退出</a>
    <ng-content></ng-content>
  </ng-template>
  `
})
export class LoginBtnComponent extends AbstractLoginComponent {
  /**
   * 显示退出登录按钮
   */
  @Input() showLogout = true;

  @Input()
  set isLogout(yes: boolean) {
    if (!this.showLogout && yes) { // 使用自定义的退出登录
      this.onLogout(false);
    }
  }

  gotoLogin() {
    navigateBy(this.router, this.routeConfig.login)
  }
}
