import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Router} from "@angular/router";

import {AppBaseConfig, AppHttpService} from '@fsl/ngxbase';
import {LibSnackService} from "@fsl/ngxmaz";

import {MyAppxApiConfig} from "../../api-config";
import {MyAppxRouteConfig} from "../../route-config";

import {CertService} from "../../../service/cert.service";
import {LoginStateService} from "../../../service/login-state.service";
import {UserHttpService} from "../../service/user-http.service";

@Component({template: ``})
export class AbstractLoginComponent implements OnInit {
  /**
   * 登录状态更改
   */
    // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<boolean>();
  /**
   * 点击退出登录
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
    public userHttp: UserHttpService,
  ) {
  }

  ngOnInit() {
    this.onCheckLoginState();
  }

  /**
   * 检查登录状态
   */
  onCheckLoginState() {
    if (this.loginStateSer.shouldPing) {
      this.loginStateSer.hasPing = true;
      this.userHttp.ping().subscribe(hasLogin => {
        this.loginStateSer.isLogin = hasLogin;
        this.change.emit(hasLogin);
        hasLogin || this.certSer.logout();
      })
    }
  }

  /**
   * 退出登录
   * @param emit
   */
  onLogout(emit = true) {
    this.http.get(this.apiConfig.logout).subscribe(_ => {
    }).add(() => {
      this.loginStateSer.isLogin = false;
      this.certSer.logout();

      emit && this.logout.emit();
      this.showSer.success('退出成功');
    })
  }
}
