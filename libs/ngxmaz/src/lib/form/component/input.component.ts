import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractMazinput} from "./abstract.mazinput";

@Component({
  selector: 'lib-form-input',
  template: `
    <mat-form-field floatLabel="always" [formGroup]="form" [ngClass]="class">
      <input matInput [formControlName]="name" [placeholder]="label"
             [required]="required"
      >
      <lib-clear matSuffix [form]="form" [name]="name"></lib-clear>
    </mat-form-field>`
})
export class MazFormInputComponent extends AbstractMazinput {

  @Input() form!: FormGroup;
  @Input() name = '';
  @Input() label = '';
  @Input() class = '';
}
