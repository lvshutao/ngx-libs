import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
  ],
  providers: [
    {provide: AlterService, useClass: LibSnackService},
    LibSnackService,
  ]
}))
export class MyNgxMazSnackModule {

}
