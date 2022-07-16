import {Component, EventEmitter, Output} from "@angular/core";
import {Router} from "@angular/router";

import {navigateBy} from '@fsl/ngxbase'
import {LibSnackService} from "@fsl/ngxmaz";

import {LoginStateService} from "../service/login-state.service";
import {UserHttpService} from "../login/service/user-http.service";
import {MyAppxRouteConfig} from "../login/route-config";


@Component({
  selector: 'lib-signer',
  template: `
    <ng-container *ngIf="loginStateSer.isLogin">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        <button mat-menu-item [routerLink]="routeConfig.userIndex">个人中心</button>
        <!-- 放置其它菜单 -->
        <ng-content></ng-content>
        <button mat-menu-item style="color: orangered;" (click)="onLogout()">退出登录</button>
      </mat-menu>

    </ng-container>
    <lib-login-btn (change)="loginChange($event)" (logout)="onLogout()"></lib-login-btn>`
})
export class SignerComponent {
  @Output() ping = new EventEmitter<boolean>(); // 登录结果

  constructor(
    public loginStateSer: LoginStateService,
    public routeConfig: MyAppxRouteConfig,
    public http: UserHttpService,
    public router: Router,
    public showSer: LibSnackService,
  ) {
  }

  loginChange(isLogin: boolean) {
    // console.log('ping RST',isLogin, typeof isLogin)
    this.loginStateSer.isLogin = isLogin;
    this.ping.emit(isLogin);
  }

  onLogout() {
    this.loginStateSer.logout(() => {
      this.showSer.success('退出成功');
      this.ping.emit(false)
      navigateBy(this.router, this.routeConfig.home)
    })
  }
}
