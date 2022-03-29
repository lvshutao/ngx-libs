import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

import {AppResponseInterceptor} from "./interceptor/app-response.interceptor";
import {TokenInterceptor} from "./interceptor/token.interceptor";

import {MyAppxAuthModule} from "./logic-module/auth/module";

import {SignerComponent} from "./component/signer.component";


const COMPONENTS = [
  SignerComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MyAppxAuthModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppResponseInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ]
})
export class MyNgxAppModule {

}
