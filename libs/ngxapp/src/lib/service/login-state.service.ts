import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";

import {PingRst, UserHttpService} from "../logic-module/service/user-http.service";
import {CertService} from "./cert.service";
import {RoleService} from "./role.service";
import {UserinfoService} from "./userinfo.service";

@Injectable({providedIn: 'root'})
/**
 * 用户登录状态
 */
export class LoginStateService {
  public isLogin = false;

  private hasPing = false;

  constructor(public userHttp: UserHttpService,
              public certSer: CertService) {
  }

  ping(done: (rst: PingRst) => void): Observable<boolean> {
    if (!!this.certSer.headerToken() && !this.hasPing) {
      return this.userHttp.ping().pipe(map(rst => {
        this.hasPing = true;
        this.isLogin = rst.login;
        RoleService.saveRoles(rst.roles)
        UserinfoService.save(rst.info);
        done(rst)
        return rst.login;
      }));
    }
    return of(this.isLogin);
  }

  logout(done: () => void) {
    if (this.certSer.headerToken()) {
      this.userHttp.logout().subscribe(_ => {
        this.isLogin = false;
        this.hasPing = false;
        this.certSer.logout();
        localStorage.clear();
        done();
      })
    }
  }
}
