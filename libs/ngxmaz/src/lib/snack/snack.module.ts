import {NgModule} from "@angular/core";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastrModule} from "ngx-toastr";

import {AlterService} from '@fsl/ngxbase'

import {SnackComponent} from "./snack.component";
import {LibSnackService} from "./snack.servic";


const MODULES = [
  MatSnackBarModule,
]

@NgModule(({
  declarations: [
    SnackComponent
  ],
  imports: [
    ...MODULES,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: AlterService, useClass: LibSnackService},
    LibSnackService,
  ]
}))
export class MyNgxMazSnackModule {

}
