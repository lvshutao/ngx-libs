import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

import {AppHttpService, httpResponseText, httpTextParams} from "@fsl/ngxbase";
import {MyAppxApiConfig} from "../config/api-config";
import {UserBase} from "../model/model";

export interface PingRst {
  login: boolean;
  roles: string[];
  info: UserBase;
}

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
    return this.http.get<string>(this.apiConfig.userAccess, httpTextParams(q)).pipe(map(rst => {
      return rst === 'true'
    }))
  }

  /**
   * 退出登录
   */
  logout(): Observable<string> {
    return this.http.get(this.apiConfig.logout, httpResponseText);
  }

  /**
   * ping 是否登录
   */
  ping(): Observable<PingRst> {
    return this.http.get(this.apiConfig.ping);
  }
}
