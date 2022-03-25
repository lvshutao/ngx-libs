import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

import {MyNgxMazModule} from "../base/maz.module";
import {MyNgxMazUploadModule} from "../upload/upload.module";


import {CaptchaInputComponent} from "./component/captcha-input.component";
import {ImagesActionComponent} from "./component/images-action.component";
import {TagsComponent} from "./component/tags.component";
import {NumberInputComponent} from "./component/number-input.component";
import {MazFormInputtipComponent} from "./component/inputtip.component";
import {MazFormInputComponent} from "./component/input.component";
import {MazFormTextareaComponent} from "./component/textarea.component";
import {MazFormImageComponent} from "./component/images.component";
import {MazFormSelectComponent} from "./component/select.component";
import {ClearComponent} from "./component/clear.component";


const COMPONENTS = [

  CaptchaInputComponent,
  ClearComponent,

  MazFormImageComponent,
  ImagesActionComponent,

  MazFormInputComponent,
  MazFormInputtipComponent,

  NumberInputComponent,
  MazFormSelectComponent,

  TagsComponent,
  MazFormTextareaComponent,
];
const MODULES = [
  MyNgxMazModule,
  MyNgxMazUploadModule,

  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatChipsModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...MODULES, ...COMPONENTS,
  ]
})
export class MyNgxMazFormModule {

}