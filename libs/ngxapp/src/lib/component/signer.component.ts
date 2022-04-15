import {Component, EventEmitter, Output} from "@angular/core";
import {Router} from "@angular/router";

import {navigateBy} from '@fsl/ngxbase'

import {LoginStateService} from "../service/login-state.service";
import {RoleService} from "../service/role.service";
import {UserHttpService} from "../logic-module/service/user-http.service";
import {MyAppxRouteConfig} from "../logic-module/route-config";
import {CertService} from "../service/cert.service";


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
    <lib-login-btn [showLogout]="false" [isLogout]="toLogout"
                   (change)="loginChange($event)" (logout)="onLogout()"></lib-login-btn>`
})
export class SignerComponent {
  toLogout = false;
  @Output() roles = new EventEmitter();
  @Output() ping = new EventEmitter<boolean>(); // 登录结果

  constructor(
    public loginStateSer: LoginStateService,
    public routeConfig: MyAppxRouteConfig,
    public http: UserHttpService,
    public router: Router,
    public certSer: CertService,
  ) {
  }

  loginChange(isLogin: boolean) {
    // console.log('ping RST',isLogin, typeof isLogin)
    this.loginStateSer.isLogin = isLogin;
    this.ping.emit(isLogin);
    if (isLogin) {
      this.checkIsAdmin();
    } else {
      this.certSer.logout();
    }
  }

  private checkIsAdmin() {
    this.http.roles().subscribe(roles => {
      RoleService.saveRoles(roles);
      this.roles.emit();
    })
  }

  onLogout() {
    Object.assign(this, {toLogout: true});
    this.http.logout().subscribe(_ => {
    }).add(() => {
      this.loginStateSer.isLogin = false;
      this.certSer.logout();
      RoleService.clear();

      navigateBy(this.router, this.routeConfig.home)
    })
  }
}
