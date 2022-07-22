import {Component, EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";

import {LibSnackService} from "@fsl/ngxmaz";

import {CertService} from "../../service/cert.service";
import {LoginStateService} from "../../service/login-state.service";
import {LoginHttpService} from "../../service/login-http.service";

import {MyAppxRouteConfig} from "../../config/route-config";
import {OauthSrc} from "../../model/model";


@Component({template: ``})
export class AbstractLoginComponent implements OnInit {
  /**
   * 登录状态更改
   */
  @Output() change = new EventEmitter<boolean>();
  /**
   * 成功退出登录后
   */
  @Output() logout = new EventEmitter();

  constructor(
    public router: Router,
    public loginStateSer: LoginStateService,
    public loginHttp: LoginHttpService,
    public routeConfig: MyAppxRouteConfig,
    public certSer: CertService,
    public showSer: LibSnackService,
  ) {
  }

  ngOnInit() {
    this.onCheckLoginState();
  }

  /**
   * 检查登录状态
   */
  onCheckLoginState() {
    this.loginStateSer.ping(rst => {
      this.change.emit(rst.login);
      rst.login || this.certSer.logout();
    }).subscribe();
  }

  /**
   * 退出登录
   */
  onLogout() {
    this.loginStateSer.logout(() => {
      this.showSer.success('退出成功');
      this.logout.emit();
    });
  }


  authSub(res: OauthSrc) {
    if (res) {
      location.href = res.url;
    }
  }
}
