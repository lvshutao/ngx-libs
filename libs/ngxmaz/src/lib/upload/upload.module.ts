import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {MyNgxUploadModule} from '@fsl/ngxupload';

import {MyNgxMazSnackModule} from "../snack/snack.module";

import {LibUploadMazFileComponent} from "./component/file/index.component";
import {LibMazUploadOneComponent} from "./component/one.component";
import {LibUploadMazFileListComponent} from "./component/list";
import {MazUploadDialogComponent} from "./component/dialog/dialog.component";
import {LibUploadMazDialogButtonComponent} from "./component/dialog/button.component";

const MODULES = [
  MyNgxMazSnackModule,
  MyNgxUploadModule,
];

const COMPONENTS = [
  LibUploadMazFileComponent,
  LibUploadMazFileListComponent,
  LibUploadMazDialogButtonComponent,

  LibMazUploadOneComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    MazUploadDialogComponent,
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
