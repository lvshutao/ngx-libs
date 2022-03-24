import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {LibMapAddressComponent} from "./component/address/address";
import {LibMapLayoutComponent} from "./component/layout.component";
import {LibMapPositionComponent} from "./component/position/position";

const COMPONENTS = [
  LibMapLayoutComponent,
  LibMapAddressComponent,
  LibMapPositionComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class MyNgxMazMapModule {

}
