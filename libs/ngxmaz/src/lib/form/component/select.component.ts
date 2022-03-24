import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Kv} from "my-tsbase";

@Component({
  selector: 'lib-form-select',
  template: `
    <mat-form-field floatLabel="always" [ngClass]="class" [formGroup]="form">
      <mat-select [disabled]="disabled" [formControlName]="name" [placeholder]="label" [required]="required">
        <mat-option [value]="defValue">{{defText}}</mat-option>
        <mat-option *ngFor="let o of kvs" [value]="o.name">{{o.title}}</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class MazFormSelectComponent {
  @Input() form!: FormGroup;
  @Input() kvs!: Kv[];
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() class: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() defValue: string | number = '';
  @Input() defText = '请选择';
}
