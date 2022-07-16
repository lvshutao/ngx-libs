import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";

import {LibSnackService} from '@fsl/ngxmaz'
import {UserHttpService} from "../../login/service/user-http.service";



@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate, CanActivateChild {
  private isAdmin = false;

  constructor(public http: UserHttpService,
              public showSer: LibSnackService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.isAdmin) {
      return true;
    }
    return this.http.access('admin').pipe(map(res => {
      if (res) {
        this.isAdmin = true;
      } else {
        this.showSer.warning('不是管理员，无权访问')
      }
      return res;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
