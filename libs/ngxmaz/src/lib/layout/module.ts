import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";



import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";

import {NgHttpLoaderModule} from "ng-http-loader";

import {LibLayoutLoaderComponent} from "./component/loader.component";
import {LibLayoutComponent} from "./component/layout.component";
import {SidenavMenuComponent} from "./component/sidenav-menu.component";
import {SidenavComponent} from "./component/sidenav.componen";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";


const COMPONENTS = [
  LibLayoutLoaderComponent,
  LibLayoutComponent,

  SidenavComponent,
  SidenavMenuComponent,
];
const MODULES = [
  CommonModule,
  HttpClientModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,
    NgHttpLoaderModule.forRoot(),

    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [
    ...COMPONENTS, ...MODULES,
  ],
  providers: [
  ]
})
export class MyNgxMazLayoutModule {
}
