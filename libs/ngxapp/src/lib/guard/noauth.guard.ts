import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {LoginStateService} from "../service/login-state.service";


// 必须没有登录才能访问
@Injectable({providedIn: 'root'})
export class NoauthGuard implements CanActivate, CanActivateChild {
  constructor(public loginState: LoginStateService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.loginState.isLogin;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.loginState.isLogin;
  }
}
