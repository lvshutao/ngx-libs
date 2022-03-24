import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {AppBaseConfig, navigateBy} from "@fsl/ngxbase";
import {LibSnackService} from "@fsl/ngxmaz";

import {LoginHttpService} from "../service/login.service";
import {CertService} from "../../../service/cert.service";
import {RedirectService} from "../../../service/redirect.service";
import {MyAppxRouteConfig} from "../../route-config";

@Component({
  template: `
    <h1 class="center" style="margin-top: 20px;">{{text}}</h1>
  `
})
export class PageAuthToken implements OnInit {
  text = '等待授权';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseConfig: AppBaseConfig,
    private routeConfig: MyAppxRouteConfig,
    private http: LoginHttpService,
    private certSer: CertService,
    private msgSer: LibSnackService,
    private redirect: RedirectService
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      const uid = q.get('uid');
      if (uid) {

        const user_sign = q.get('user_sign') || '';
        const app_name = q.get('app_name') || this.baseConfig.name;
        const app_sign = q.get('app_sign') || '';

        this.http.cert({uid, user_sign, app_name, app_sign}).subscribe(uc => {
          this.certSer.saveCert(uc)
          this.msgSer.success('授权成功');
          const path = this.redirect.read(true) || this.routeConfig.home;
          navigateBy(this.router, path)
        });
      } else {
        this.text = '授权参数错误';
        this.msgSer.danger('授权参数错误');
      }
    });
  }
}
