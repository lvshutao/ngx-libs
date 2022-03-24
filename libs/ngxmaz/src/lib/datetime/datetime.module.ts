import {NgModule} from "@angular/core";

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {MyNgxBaseModule} from "@fsl/ngxbase";

import {MyNgxMazFormModule} from "../form/form.module";

import {LibDateComponent} from "./date/date";
import {LibTimeComponent} from "./time/time";
import {LibMonthComponent} from "./month.component";
import {LibDatetimeComponent} from "./datetime/datetime";
import {LibDatetimeRowComponent} from "./datetime-row.component";
import {LibTimeRangeComponent} from "./time-range.component";

const COMPONENTS = [
  LibDateComponent,
  LibTimeComponent,
  LibMonthComponent,
  LibDatetimeComponent,
  LibDatetimeRowComponent,
  LibTimeRangeComponent,
];

const MODULES = [
  MyNgxBaseModule,
  MyNgxMazFormModule,

  NgxMaterialTimepickerModule,


];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,

    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
  ]
})
export class MyNgxMazDatetimeModule {

}
