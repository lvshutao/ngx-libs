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

import {MyNgxBaseModule} from '@fsl/ngxbase'

import {MyMgxMazImageViewerModule} from "../image-viewer/module";

import {DialogActionSheetComponent} from "./dialog/action-sheet";
import {DialogAlertComponent} from "./dialog/alter";
import {DialogConfirmComponent} from "./dialog/confirm";
import {DialogImageComponent} from "./dialog/image";
import {DialogInputComponent} from "./dialog/input";
import {DialogSelectComponent} from "./dialog/select";
import {DialogShareSheetComponent} from "./dialog/share-sheet";
import {DialogTextareaComponent} from "./dialog/textarea";
import {LibDialogService} from "./dialog/dialog.service";

import {LibListtileComponent} from "./components/listtile.component";
import {LibLinkComponent} from "./components/link.component";

import {PaginatorComponent} from "./components/paginator.component";
import {AddButtonComponent} from "./components/add-button.component";
import {BackIconComponent} from "./components/back-icon.component";
import {BackBarComponent, BackBarSubmitComponent} from "./components/back-bar.component";
import {BackSubmitComponent} from "./components/back-submit.component";
import {CardComponent} from "./components/card.component";
import {CloseButtonComponent} from "./components/close-button.component";
import {DialogBarComponent} from "./components/dialog-bar.component";
import {DialogCloseBarComponent} from "./components/dialog-close.component";
import {ImagesComponent} from "./components/images.component";
import {ButtonComponent} from "./components/button.component";
import {ResendComponent} from "./components/resend.component";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

const DIALOGS = [
  DialogActionSheetComponent,
  DialogAlertComponent,
  DialogConfirmComponent,
  DialogImageComponent,
  DialogInputComponent,
  DialogSelectComponent,
  DialogShareSheetComponent,
  DialogTextareaComponent,

];
const COMPONENTS = [
  AddButtonComponent,
  BackBarComponent,
  BackBarSubmitComponent,
  BackIconComponent,
  BackSubmitComponent,
  ButtonComponent,
  CardComponent,
  CloseButtonComponent,
  DialogBarComponent,
  DialogCloseBarComponent,
  ImagesComponent,
  LibListtileComponent,
  LibLinkComponent,
  PaginatorComponent,
  ResendComponent,
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
