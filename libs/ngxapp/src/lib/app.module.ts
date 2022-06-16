import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";


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
  ]
})
export class MyNgxAppModule {

}
