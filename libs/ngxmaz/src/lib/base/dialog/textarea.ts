import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {MyObject} from "my-tsbase";
import {InputData} from "./input";


const defaultData = {title: '', content: '', cancel: '取消', done: '确定'};

@Component({
  template: `
    <div mat-dialog-content>
      <mat-form-field style="width: 100%;">
        <textarea matInput [(ngModel)]="data.content" [placeholder]="data.title"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="row-space-between">
      <span class="fill-space"></span>
      <button mat-stroked-button (click)="done(false)">{{data.cancel}}</button>
      &nbsp;
      <button mat-stroked-button color="warn" (click)="done(true)">{{data.done}}</button>
    </div>
  `
})
export class DialogTextareaComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InputData,
    public dialogRef: MatDialogRef<DialogTextareaComponent>
  ) {
    MyObject.overwriteIfNotSet(this.data, defaultData);
  }

  done(result: boolean) {
    this.dialogRef.close(result ? this.data.content : null);
  }
}
