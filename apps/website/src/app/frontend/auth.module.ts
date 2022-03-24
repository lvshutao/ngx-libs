import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {MyAppxAuthModule, PageAuthLogin, PageAuthToken} from "@fsl/ngxapp";

@NgModule({
  imports: [
    MyAppxAuthModule,
    RouterModule.forChild([
      {path: 'login', component: PageAuthLogin},
      {path: 'token', component: PageAuthToken}
    ])
  ]
})
export class AuthModule {

}
