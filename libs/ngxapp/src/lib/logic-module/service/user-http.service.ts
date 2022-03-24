import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {AppHttpService, httpParams} from "@fsl/ngxbase";
import {MyAppxApiConfig} from "../api-config";

@Injectable({providedIn: 'root'})
export class UserHttpService {
  constructor(
    private http: AppHttpService,
    private apiConfig: MyAppxApiConfig,
  ) {
  }

  /**
   * 用户能否访问某个角色
   * @param q {Object} {role:角色名称,name:应用名称}
   */
  access(q: any = {}): Observable<boolean> {
    return this.http.get<boolean>(this.apiConfig.userAccess, httpParams(q));
  }

  /**
   * 获取用户的角色
   * @param q {Object} 示例 {name:应用名称}
   */
  roles(q: any = {}): Observable<string[]> {
    return this.http.get<string[]>(this.apiConfig.userRoles, q);
  }

  /**
   * 退出登录
   */
  logout(): Observable<any> {
    return this.http.get(this.apiConfig.logout);
  }

  /**
   * ping 是否登录
   */
  ping(): Observable<boolean> {
    return this.http.getWith<boolean>(this.apiConfig.ping)
  }
}
