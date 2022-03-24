import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";

import {AlterService} from "@fsl/ngxbase";

import {LoginStateService} from "../service/login-state.service";
import {ResponseCallbackService} from "../service/response-callback.service";
import {UserHttpService} from "../logic-module/service/user-http.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
/**
 * 使用注意，需要提前 ping，然后将结果写入到 loginState.isLogin 中，否则可能导致无法登录
 */
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private loginState: LoginStateService,
    private showSer: AlterService,
    private callback: ResponseCallbackService,
    private userHttp: UserHttpService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // 检查链接地址 state.url
    if (this.loginState.isLogin) {
      return true;
    } else if (this.loginState.shouldPing) {
      this.loginState.hasPing = true;
      return this.userHttp.ping()
    }
    this.showSer.danger('你还没有登录');
    this.callback.status401(location.href);
    return false;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> {
    return this.canActivate(next, state);
  }
}
