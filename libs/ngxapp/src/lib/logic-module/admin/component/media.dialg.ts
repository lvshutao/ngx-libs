import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface MediaData {
  title: string;
  summary: string;
}

@Component({
  template: `<div mat-dialog-title>图片信息</div>
  <div mat-dialog-content>
    <div class="lib-form">

      <mat-form-field floatLabel="always">
        <input matInput name="title" placeholder="标题"
               [(ngModel)]="info.title">
      </mat-form-field>

      <mat-form-field floatLabel="always">
      <textarea matInput name="summary" placeholder="简介"
                [(ngModel)]="info.summary"></textarea>
      </mat-form-field>
    </div>

    <div class="dialog-actions">
      <a mat-button (click)="ref.close()">取消</a>
      <a mat-button color="primary" (click)="ref.close(info)">保存</a>
    </div>
  </div>
  `
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MazMediaEditDialog {
  info: MediaData = {title: '', summary: ''};

  constructor(@Inject(MAT_DIALOG_DATA) data: MediaData,
              public ref: MatDialogRef<MazMediaEditDialog>) {
    this.info = data;
  }
}
