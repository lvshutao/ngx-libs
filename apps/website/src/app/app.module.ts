import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

import {AppBaseConfig} from "@fsl/ngxbase";
import {LayoutService, MyNgxMazLayoutModule, MyNgxMazMapConfig, MyNgxMazMapModule} from "@fsl/ngxmaz";
import {MyAppxAuthModule, MyNgxAppModule} from "@fsl/ngxapp";


import {AppComponent} from './app.component';
import {LayoutComponent} from "./frontend/layout.component";
import {FrontendHomePage} from "./frontend/home";

import {environment} from "../environments/environment";
import {NotFound404Page} from "./frontend/404.page";
import {LayoutSidenavComponent} from "./frontend/demo/layout-sidenav.component";
import {ChecksComponent} from "./frontend/demo/checks.component";
import {LayoutSidenav2Component} from "./frontend/demo/layout-sidenav2.component";
import {Layout2Component} from "./frontend/demo/layout2.component";
import {MyNgxUploadConfig} from "@fsl/ngxupload";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FrontendHomePage,
    NotFound404Page,
    // demo test 以下组件及文件可移除
    ChecksComponent,
    Layout2Component,
    LayoutSidenavComponent,
    LayoutSidenav2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MyNgxAppModule,
    MyAppxAuthModule,
    MyNgxMazLayoutModule,
    MyNgxMazMapModule,
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: FrontendHomePage},
          {path: 'auth', loadChildren: () => import('./frontend/auth.module').then(m => m.AuthModule)}
        ]
      },
      {path: 'layout2', component: Layout2Component},
      {path: 'sidenav1', component: LayoutSidenavComponent},
      {path: 'sidenav2', component: LayoutSidenav2Component},
      // 用户管理
      {path: 'user', loadChildren: () => import('./backend/module').then(m => m.BackendModule)},
      {path: '**', component: NotFound404Page},
    ], {useHash: true}),

  ],
  providers: [
    {provide: AppBaseConfig, useValue: environment.appBaseConfig},
    {provide: MyNgxMazMapConfig, useValue: environment.map},
    {provide: MyNgxUploadConfig, useValue: environment.upload},
    LayoutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
