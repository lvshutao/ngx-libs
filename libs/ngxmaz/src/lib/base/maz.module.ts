import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

import {MyNgxBaseModule} from '@fsl/ngxbase'

import {MyMgxMazImageViewerModule} from "../image-viewer/module";

import {DialogActionSheetComponent} from "./dialog/action-sheet";
import {DialogAlertComponent} from "./dialog/alter";
import {DialogConfirmComponent} from "./dialog/confirm";
import {DialogImageComponent} from "./dialog/image";
import {DialogImageCaptcha} from "./dialog/image-captcha";
import {DialogInputComponent} from "./dialog/input";
import {DialogSelectComponent} from "./dialog/select";
import {DialogShareSheetComponent} from "./dialog/share-sheet";
import {DialogTextareaComponent} from "./dialog/textarea";
import {LibDialogService} from "./dialog/dialog.service";

import {ListtileComponent} from "./components/listtile.component";
import {LinkComponent} from "./components/link.component";

import {PaginatorComponent} from "./components/paginator.component";
import {ButtonAddComponent, CircleButtonComponent} from "./components/button-add.component";
import {BackBarComponent} from "./components/back-bar.component";
import {BackSubmitComponent} from "./components/back-submit.component";
import {CardComponent} from "./components/card.component";
import {ButtonCloseComponent} from "./components/button-close.component";
import {DialogBarComponent} from "./components/dialog-bar.component";
import {DialogCloseBarComponent} from "./components/dialog-close.component";

import {ButtonResendComponent} from "./components/button-resend.component";
import {BackBarSubmitComponent} from "./components/back-bar-submit.component";


const DIALOGS = [
  DialogActionSheetComponent,
  DialogAlertComponent,
  DialogConfirmComponent,
  DialogImageComponent,
  DialogImageCaptcha,
  DialogInputComponent,
  DialogSelectComponent,
  DialogShareSheetComponent,
  DialogTextareaComponent,
];
const COMPONENTS = [

  BackBarComponent,
  BackBarSubmitComponent,
  BackSubmitComponent,

  ButtonAddComponent, CircleButtonComponent,
  ButtonResendComponent,
  ButtonCloseComponent,

  CardComponent,
  DialogBarComponent,
  DialogCloseBarComponent,

  ListtileComponent,
  LinkComponent,
  PaginatorComponent,
];
const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  MyNgxBaseModule,
  MyMgxMazImageViewerModule,

  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
];

@NgModule({
  declarations: [...DIALOGS, ...COMPONENTS],
  imports: [...MODULES, MatPaginatorModule, MyNgxBaseModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  exports: [...COMPONENTS, ...MODULES],
  providers: [
    LibDialogService,
  ]
})
export class MyNgxMazModule {

}
