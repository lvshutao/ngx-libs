import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MyObject} from "my-tsbase";


export interface ConfirmConfig {
  title?: string;
  cancel?: string;
  done?: string;
  content?: string;
  input?: boolean;
}

export interface ConfirmRst {
  action: boolean;
  reason: string;
}

const defaultData = {title: '警告 !', done: '确定', cancel: '取消', content: '确定要删除此选项吗？', input: false};

// 第一个按钮会自动获取焦点(按 enter 选中)，所以需要放置为取消按钮
@Component({
  template: `
    <div mat-dialog-title style="color: darkred;">{{data.title}}</div>
    <div mat-dialog-content [innerHTML]="data.content"></div>

    <div *ngIf="data.input">
      <mat-form-field>
        <input matInput name="reason" [(ngModel)]="reason" placeholder="操作原因">
        <mat-icon matSuffix (click)="reason=''">delete</mat-icon>
      </mat-form-field>
    </div>
    <!-- 操作 -->
    <div mat-dialog-actions class="row-space-between">
      <span class="fill-space"></span>
      <button mat-stroked-button (click)="done(false)">{{data.cancel}}</button>
      &nbsp;
      <button mat-stroked-button color="warn" (click)="done(true)">{{data.done}}</button>
    </div>
  `
})
export class DialogConfirmComponent {
  reason = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmConfig = {},
    public dialogRef: MatDialogRef<DialogConfirmComponent>
  ) {
    MyObject.overwriteIfNotSet(this.data, defaultData);
  }

  done(result: boolean) {
    if (this.data.input) {
      this.dialogRef.close({action: result, reason: this.reason});
    } else {
      this.dialogRef.close(result);
    }
  }
}
