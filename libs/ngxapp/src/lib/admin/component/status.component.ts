import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'lib-form-status',
  template: `
    <mat-form-field floatLabel="always" class="width100" [formGroup]="form">
      <mat-select [formControlName]="name" placeholder="状态">
        <mat-option value="">请选择</mat-option>
        <mat-option value="active">正常</mat-option>
        <mat-option value="disabled">禁用</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class MazFormStatusComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name = 'status';
}
