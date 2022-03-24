import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

import {MyNgxMazFormModule} from "@fsl/ngxmaz";

import {LoginBtnComponent} from "./component/login-btn.component";
import {LibAuthWechatBtnComponent} from "./component/wechat-login-btn.component";
import {LibWxWorkSrcBtnComponent} from "./component/wxwork-login-btn.component";
import {AuthLayoutComponent} from "./component/auth-layout.component";

import {PageAuthToken} from "./page/token.page";
import {PageAuthLogin} from "./page/login";
import {ImageCaptchaDialog} from "./component/image-captcha.dialog";
import {LibCaptchaComponent} from "./component/captcha.component";
import {AbstractLoginComponent} from "./component/abstract";

const COMPONENTS = [
  LoginBtnComponent,

  LibCaptchaComponent,
  LibAuthWechatBtnComponent,
  LibWxWorkSrcBtnComponent,
  AuthLayoutComponent,

  PageAuthToken,
  PageAuthLogin,
];

@NgModule({
  declarations: [...COMPONENTS,
    ImageCaptchaDialog,
    AbstractLoginComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    MyNgxMazFormModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class MyAppxAuthModule {

}
