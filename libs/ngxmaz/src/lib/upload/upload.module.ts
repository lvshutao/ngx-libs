import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {MyNgxUploadModule} from '@fsl/ngxupload';

import {MyNgxMazSnackModule} from "../snack/snack.module";

import {LibMazUploadFileComponent} from "./component/file/index.component";
import {LibMazUploadFormOneComponent} from "./component/form-one.component";
import {LibMazUploadOneComponent} from "./component/one.component";
import {LibMazUploadFormImagesComponent} from "./component/form-images.component";

const MODULES = [
  MyNgxMazSnackModule,
  MyNgxUploadModule,
];

const COMPONENTS = [
  LibMazUploadFileComponent,
  LibMazUploadOneComponent,

  LibMazUploadFormOneComponent,
  LibMazUploadFormImagesComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,

    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ...MODULES, ...COMPONENTS,
  ]
})
export class MyNgxMazUploadModule {

}
