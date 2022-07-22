import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {AppBaseConfig, navigateBy} from "@fsl/ngxbase";
import {LibSnackService} from "@fsl/ngxmaz";

import {RedirectService} from "../../service/redirect.service";
import {MyAppxRouteConfig} from "../../config/route-config";
import {LoginHttpService} from "../../service/login-http.service";
import {LoginStateService} from "../../service/login-state.service";


@Component({
  template: `
    <h1 class="center" style="margin-top: 20px;">{{text}}</h1>
  `
})
export class PageAuthToken implements OnInit {
  text = '等待授权';

  constructor(
    private config: AppBaseConfig,
    private routeConfig: MyAppxRouteConfig,
    private http: LoginHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private msgSer: LibSnackService,
    private redirect: RedirectService,
    private loginState: LoginStateService,
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      const uid = q.get('uid');
      if (uid) {

        const user_sign = q.get('user_sign') || '';
        const app_name = q.get('app_name') || this.config.name;
        const app_sign = q.get('app_sign') || '';

        this.http.cert({uid, user_sign, app_name, app_sign}).subscribe(uc => {
          const {success, msg} = this.loginState.certSer.saveCert(uc)
          if (success) {
            this.msgSer.success('授权成功');
            location.href = this.redirect.read(true) || this.routeConfig.home;
          } else {
            this.text = msg;
            this.msgSer.danger(msg);
          }
        });
      } else {
        this.text = '授权参数错误';
        this.msgSer.danger('授权参数错误');
      }
    });
  }
}
