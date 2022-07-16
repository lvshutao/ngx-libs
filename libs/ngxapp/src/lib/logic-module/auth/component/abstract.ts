import {Component, EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";

import {AppBaseConfig, AppHttpService} from '@fsl/ngxbase';
import {LibSnackService} from "@fsl/ngxmaz";

import {MyAppxApiConfig} from "../../api-config";
import {MyAppxRouteConfig} from "../../route-config";

import {CertService} from "../../../service/cert.service";
import {LoginStateService} from "../../../service/login-state.service";

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
    public config: AppBaseConfig,
    public apiConfig: MyAppxApiConfig,
    public routeConfig: MyAppxRouteConfig,
    public router: Router,
    public http: AppHttpService,
    public certSer: CertService,
    public loginStateSer: LoginStateService,
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
}
