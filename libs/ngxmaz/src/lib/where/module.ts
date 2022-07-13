import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {AbstractListPageComponent} from "./list-page.component";
import {LibWhereStatusComponent} from "./status.component";
import {LibWhereStateComponent} from "./state.component";
import {LibWhereSelectComponent} from "./select.component";
import {LibWhereInputComponent} from "./input.component";
import {LibWhereActionComponent} from "./action.component";
import {AbstractEditPageComponent} from "./edit-page.component";

const COMPONENTS = [
  AbstractListPageComponent,
  AbstractEditPageComponent,

  LibWhereStateComponent,
  LibWhereStatusComponent,
  LibWhereSelectComponent,
  LibWhereInputComponent,
  LibWhereActionComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
  imports: [
    MatInputModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class WhereModule {

}
