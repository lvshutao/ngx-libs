import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {MyAssets, MyObject} from "my-tsbase";

export interface InputData {
  title: string;
  content: string | number;
  cancel?: string;
  done?: string;
}

const defaultData = {title: '', content: '', cancel: '取消', done: '确定'};

@Component({
  template: `
    <div mat-dialog-content>
      <mat-form-field class="full-width" floatLabel="always">
        <input *ngIf="isNum else string"
               type="number"
               style="text-align: center;"
               #input (focus)="input.select()"
               matInput [(ngModel)]="data.content" [placeholder]="data.title">
        <ng-template #string>
          <input matInput [(ngModel)]="data.content" [placeholder]="data.title">
        </ng-template>
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
export class DialogInputComponent {
  isNum = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InputData,
    public dialogRef: MatDialogRef<DialogInputComponent>
  ) {
    this.isNum = MyAssets.isNumber(data.content);
    MyObject.overwriteIfNotSet(this.data, defaultData);
  }

  done(result: boolean) {
    this.dialogRef.close(result ? this.data.content : null);
  }
}
