import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'lib-form-textarea',
  template: `
    <mat-form-field floatLabel="always" [formGroup]="form">
      <textarea rows="5" matInput
                [formControlName]="name" [placeholder]="label">
      </textarea>
      <lib-clear matSuffix [form]="form" [name]="name"></lib-clear>
    </mat-form-field>`
})
export class MazFormTextareaComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name: string = '';
  @Input() label: string = '';
}
