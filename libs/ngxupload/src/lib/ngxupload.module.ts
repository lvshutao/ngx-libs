import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {LibUploadTriggerComponent} from "./base/trigger.component";
import {LibUploadHideComponent} from "./base/hide.component";
import {LibUploadSelectComponent} from "./base/select.component";

import {LibUploadAvatarComponent} from "./component/avatar.component";
import {LibUploadWrapComponent} from "./component/wrap.component";

import {BytesPipe} from "./pipe/bytes.pipe";

const COMPONENTS = [
  LibUploadTriggerComponent,
  LibUploadHideComponent,
  LibUploadSelectComponent,

  LibUploadAvatarComponent,
  LibUploadWrapComponent,
  BytesPipe,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
  ]
})
export class MyNgxUploadModule {
}
