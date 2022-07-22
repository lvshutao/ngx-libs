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
import {MatMenuModule} from "@angular/material/menu";

import {MyNgxMazFormModule} from "@fsl/ngxmaz";

import {AbstractLoginComponent} from "./component/abstract";
import {AuthLayoutComponent} from "./component/auth-layout.component";
import {BtnLoginComponent} from "./component/btn-login.component";
import {BtnLoginWechatComponent} from "./component/btn-login-wechat.component";
import {BtnLoginWxworkComponent} from "./component/btn-login-wxwork.component";
import {CaptchaComponent} from "./component/captcha.component";
import {SignerComponent} from "./component/signer.component";

import {PageAuthToken} from "./page/token.page";
import {PageAuthLogin} from "./page/login.page";




const COMPONENTS = [
  AuthLayoutComponent,

  BtnLoginComponent,
  BtnLoginWechatComponent,
  BtnLoginWxworkComponent,

  CaptchaComponent,
  SignerComponent,

  PageAuthToken,
  PageAuthLogin,
];

@NgModule({
  declarations: [...COMPONENTS,
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
    MatMenuModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class MyAppxAuthModule {

}
