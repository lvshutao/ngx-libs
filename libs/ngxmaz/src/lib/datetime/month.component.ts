import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {FloatLabelType} from '@angular/material/form-field';

import {MyAssets, MyDatetime} from "my-tsbase";
import {myMoment} from "./moment";


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
  },
};

@Component({
  selector: 'lib-month',
  template: `
    <a mat-icon-button
       (click)="bindPre()"
       *ngIf="action">
      <mat-icon>chevron_left</mat-icon>
    </a>
    <mat-form-field [style.width.px]="width" [floatLabel]="floatLabel">
      <input (click)="picker.open()" [(ngModel)]="value"
             readonly matInput [matDatepicker]="picker" [placeholder]="label"
      >

      <mat-datepicker #picker startView="year"
                      (monthSelected)="change($event, picker)">
      </mat-datepicker>

      <a mat-icon-button matSuffix (click)="clear()">
        <mat-icon>clear</mat-icon>
      </a>
    </mat-form-field>
    <a mat-icon-button
       (click)="bindNext()"
       *ngIf="action">
      <mat-icon>chevron_right</mat-icon>
    </a>
  `,
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class LibMonthComponent {

  value = '';
  @Input() label = '月份选择';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() width = 100;
  @Input() action = true;

  @Output() monthChange = new EventEmitter<string>();

  @Input()
  set initValue(v: string | number) {
    if (MyAssets.isEmpty(v)) {
      this.value = '';
    } else if (v != this.value) {
      const d = MyDatetime.parseNewDate(v);
      if (d) {
        this.value = [d.getFullYear(), MyDatetime.fillZero(d.getMonth() + 1)].join('-');
      }
    }
  }

  clear() {
    this.value = '';
    this.monthChange.emit('');
  }

  change(event: any, picker: any) {
    this.value = [event.year(), MyDatetime.fillZero(event.month() + 1)].join('-');
    this.monthChange.emit(this.value);
    picker.close();
  }

  bindPre() {
    this.changeMonth(-1);
  }

  bindNext() {
    this.changeMonth(1);
  }

  changeMonth(cha: number) {
    let ym;
    if (this.value == '') {
      ym = myMoment(new Date()).format('YYYY-MM')
    } else {
      const m = myMoment(this.value).add(cha, 'M');
      ym = m.format('YYYY-MM');
    }
    this.value = ym;
    this.monthChange.emit(this.value);
  }
}
