import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-time-range',
  template: `
    <div *ngIf="form" [formGroup]="form" class="row">
      <div style="width: 70px;line-height: 60px;" class="placeholder">开始时间:</div>
      <div style="width: 150px;">
        <mat-form-field floatLabel="never">
          <input style="text-align: center;" type="time" matInput [formControlName]="beginName">
          <lib-clear [form]="form" [name]="beginName" matSuffix></lib-clear>
        </mat-form-field>
      </div>
      <div style="width: 70px;line-height: 60px;" class="placeholder">结束时间:</div>
      <div style="width: 150px;">
        <mat-form-field floatLabel="never">
          <input style="text-align: center;" type="time" matInput [formControlName]="endName">
          <lib-clear [form]="form" [name]="endName" matSuffix></lib-clear>
        </mat-form-field>
      </div>
      <div class="flex1">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class LibTimeRangeComponent {
  @Input() form!: FormGroup;
  @Input() beginName = 'begin_at';
  @Input() endName = 'end_at';
}

// 不兼容 Firefox
