import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

import {Kv} from "my-tsbase";

export interface SelectData {
  options: Kv[];
  useName: boolean;
  selected: any;

  showReason: boolean,
  reasonTitle: string;
  reason: string;
}

@Component({
  template: `
    <form class="lib-form" [formGroup]="mo" (ngSubmit)="onSubmit()">
      <mat-form-field floatLabel="always">
        <mat-select formControlName="selected" placeholder="选项">
          <ng-container *ngIf="data.useName; else useId">
            <mat-option value="">请选择</mat-option>
            <mat-option *ngFor="let o of data.options" [value]="o.name">{{o.title}}</mat-option>
          </ng-container>

          <ng-template #useId>
            <mat-option [value]="0">请选择</mat-option>
            <mat-option *ngFor="let o of data.options" [value]="o.id">{{o.title}}</mat-option>
          </ng-template>
        </mat-select>
      </mat-form-field>

      <mat-form-field *ngIf="data.showReason" floatLabel="always">
        <textarea matInput formControlName="reason" [placeholder]="data.reasonTitle"></textarea>
      </mat-form-field>

      <div style="padding: 20px 10px;">
        <a mat-flat-button mat-dialog-close>取消</a>
        <button style="margin: 0 15px" mat-flat-button color="primary"
                [disabled]="mo.invalid">确定
        </button>
      </div>
    </form>`
})
export class DialogSelectComponent implements OnInit {
  mo = this.fb.group({
    selected: ['', [Validators.required]],
    reason: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SelectData,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogSelectComponent>,
  ) {
  }

  ngOnInit() {
    this.mo.patchValue({
      selected: this.data.selected,
      reason: this.data.reason || '',
    });
  }

  onSubmit() {
    this.dialogRef.close(this.mo.value);
  }
}
