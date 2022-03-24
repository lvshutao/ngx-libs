import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
/**
 * 用户登录状态
 */
export class LoginStateService {
  public isLogin = false;

  public hasPing = false;

  get shouldPing(): boolean {
    return !(this.isLogin || this.hasPing);
  }
}
