import {FormBuilder, Validators} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {MySecret} from "my-tsbase";
import {AppBaseConfig, matchingAccount, matchingCaptcha, matchingPassword, navigateBy} from "@fsl/ngxbase";
import {LibSnackService} from "@fsl/ngxmaz";

import {MyAppxRouteConfig} from "../../config/route-config";

import {LoginHttpService} from "../../service/login-http.service";
import {KEY_REDIRECT, RedirectService} from "../../service/redirect.service";
import {UserCert} from "../../model/model";
import {LoginStateService} from "../../service/login-state.service";


@Component({
  templateUrl: 'login.page.html',
})
export class PageAuthLogin implements OnInit {

  name = 'admin';
  senderState = false; // 验证码发送状态
  isLoading = false;

  mo = this.fb.group({
    account: ['', [Validators.required, matchingAccount()]],
    password: ['', [Validators.required, matchingPassword()]],
  });

  // 无秘登录
  noMo = this.fb.group({
    account: ['', [Validators.required, matchingAccount()]],
    code: ['', [Validators.required, matchingCaptcha]],
  });

  constructor(
    private conf: AppBaseConfig,
    private routeConfig: MyAppxRouteConfig,
    private fb: FormBuilder,
    private http: LoginHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private showSer: LibSnackService,
    private redirect: RedirectService,
    private loginState: LoginStateService,
  ) {
    if (this.conf.name) {
      this.name = this.conf.name;
    }
    if (this.conf.debug) {
      console.log('AppAuthRegister app name:', this.name);
    }
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      this.redirect.save(q.get(KEY_REDIRECT));
    });
  }

  /**
   * 账号密码登录
   */
  bindLogin(rst: any) {
    const pd = Object.assign({name: this.name}, this.mo.value, rst);
    pd.password = MySecret.generatePassword(pd.password); // 密码 hash
    this.isLoading = true;
    this.http.login(pd).subscribe(cert => this.loginSuccess(cert)).add(() => {
      this.isLoading = false;
    });
  }

  /**
   * 发送手机、邮箱 验证码
   */
  bindSendCode(rst: any) {
    const account = this.noMo.get('account')?.value
    const data = Object.assign({name: this.name}, rst, {account});
    this.isLoading = true;
    this.http.noPwdLoinCode(data).subscribe(() => {
      this.showSer.success('验证码发送成功');
      this.senderState = !this.senderState;
    }).add(() => {
      this.isLoading = false;
    });
  }

  /**
   * 无密码登录
   */
  bindNoPwdLogin() {
    this.isLoading = true;
    this.http.noPwdLogin(Object.assign({name: this.name}, this.noMo.value))
      .subscribe(cert => this.loginSuccess(cert)).add(() => {
      this.isLoading = false;
    });
  }

  private loginSuccess(uc: UserCert) {
    if (uc.uid) {
      const {success, msg} = this.loginState.certSer.saveCert(uc);
      if (success) {
        this.showSer.success('登录成功');
        location.href = this.redirect.read(true) || this.routeConfig.home;
      } else {
        this.showSer.danger(msg);
      }
    } else {
      this.showSer.danger('登录凭证错误');
    }
  }
}
