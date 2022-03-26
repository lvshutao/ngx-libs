import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractMazinput} from "./abstract.mazinput";

@Component({
  selector: 'lib-form-number-input',
  template: `
    <mat-form-field floatLabel="always" [formGroup]="form" [class]="class">
      <input matInput type="number" style="text-align: center;"
             [min]="min"
             [required]="required"
             [readonly]="readonly"
             [formControlName]="name" #input (focus)="input.select()"
             [placeholder]="label"
      >
      <lib-clear [form]="form" [name]="name" matSuffix></lib-clear>
    </mat-form-field>`
})
export class NumberInputComponent extends AbstractMazinput{
  @Input() form!: FormGroup;
  @Input() name = '';
  @Input() min = 0;
  @Input() label = '';
  @Input() class = 'width100';
}
