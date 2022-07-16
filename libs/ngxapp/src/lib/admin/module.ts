import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

import {MyNgxBaseModule} from "@fsl/ngxbase";
import {MyNgxUploadModule} from "@fsl/ngxupload";
import {MyNgxMazFormModule} from '@fsl/ngxmaz'

import {MazMediaEditDialog} from "./component/media.dialg";
import {MazFormMediasComponent} from "./component/medias.component";
import {MazFormStateComponent} from "./component/state.component";
import {MazFormStatusComponent} from "./component/status.component";


const COMPONENTS = [
  MazMediaEditDialog,
  MazFormMediasComponent,
  MazFormStateComponent,
  MazFormStatusComponent
];

@NgModule({
  imports: [
    MyNgxMazFormModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MyNgxBaseModule,
    MyNgxMazFormModule,
    MyNgxUploadModule,
    MatSelectModule,
    MyNgxMazFormModule,
    MyNgxBaseModule,
    MyNgxMazFormModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class MyAppxAdminModule {

}
