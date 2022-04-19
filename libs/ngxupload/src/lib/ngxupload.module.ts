import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {LibUploadTriggerComponent} from "./base/trigger.component";
import {LibUploadHideComponent} from "./base/hide.component";

import {LibUploadAvatarComponent} from "./component/avatar.component";
import {LibUploadWrapComponent} from "./component/wrap.component";

import {BytesPipe} from "./pipe/bytes.pipe";
import {LibUploadSelectComponent} from "./base/select.component";

const COMPONENTS = [
  LibUploadAvatarComponent,
  LibUploadTriggerComponent,
  LibUploadHideComponent,
  LibUploadWrapComponent,
  LibUploadSelectComponent,
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
