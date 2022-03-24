import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {LibUploadTriggerComponent} from "./component/trigger.component";
import {LibUploadHideComponent} from "./component/hide.component";
import {LibUploadAvatarComponent} from "./component/avatar.component";
import {LibUploadWrapComponent} from "./component/wrap.component";

import {BytesPipe} from "./pipe/bytes.pipe";

const COMPONENTS = [
  LibUploadAvatarComponent,
  LibUploadTriggerComponent,
  LibUploadHideComponent,
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
export class MyNgxUploadModule {}
