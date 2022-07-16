import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {MyTextService} from "my-tsbase";

@Component({
  selector: 'lib-form-state',
  template: `
    <div [formGroup]="form" class="row">
      <div style="width: 250px;">
        <mat-form-field class="width100" floatLabel="always">
          <mat-select formControlName="status" placeholder="用户状态">
            <mat-option value="">请选择</mat-option>
            <mat-option *ngFor="let o of textSer.mapStatusOptions" [value]="o.name">{{o.title}}</mat-option>
          </mat-select>
        </mat-form-field>
        <lib-hspace></lib-hspace>
        <mat-form-field class="width100" floatLabel="always">
          <mat-select formControlName="state" placeholder="审核状态">
            <mat-option value="">请选择</mat-option>
            <mat-option *ngFor="let o of textSer.mapStatusOptions" [value]="o.name">{{o.title}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="flex1">
        <mat-form-field floatLabel="always">
          <input matInput formControlName="state_msg" placeholder="审核信息">
          <lib-form-clear matSuffix [form]="form" name="state_msg"></lib-form-clear>
        </mat-form-field>
      </div>
    </div>`
})
export class MazFormStateComponent {
  textSer = MyTextService;
  // @ts-ignore
  @Input() form: FormGroup;
}
