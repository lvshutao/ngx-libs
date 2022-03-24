import {NgModule} from "@angular/core";
import {LibTcCaptchaComponent} from "./captcha.component";

const COMPONENTS = [
  LibTcCaptchaComponent,
]

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class MyNgxTcCaptchaModule {

}
