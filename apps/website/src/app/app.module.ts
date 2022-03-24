import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

import {AppBaseConfig} from "@fsl/ngxbase";
import {MyNgxMazLayoutModule} from "@fsl/ngxmaz";
import {MyAppxAuthModule, MyNgxAppModule} from "@fsl/ngxapp";


import {AppComponent} from './app.component';
import {LayoutComponent} from "./frontend/layout.component";
import {FrontendHomePage} from "./frontend/home";

import {environment} from "../environments/environment";
import {NotFound404Page} from "./frontend/404.page";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FrontendHomePage,
    NotFound404Page,
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
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: FrontendHomePage},
          {path: 'auth', loadChildren: () => import('./frontend/auth.module').then(m => m.AuthModule)}
        ]
      },
      // 用户管理
      {path: 'user', loadChildren: () => import('./backend/module').then(m => m.BackendModule)},
      {path: '**', component: NotFound404Page},
    ], {useHash: true}),

  ],
  providers: [
    {provide: AppBaseConfig, useValue: environment.appBaseConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
