import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {AbstractMazinput} from "./abstract.mazinput";

@Component({
  selector: 'lib-form-textarea',
  template: `
    <mat-form-field floatLabel="always" [formGroup]="form" class="width-100">
      <textarea rows="5" matInput
                [required]="required"
                [formControlName]="name" [placeholder]="label">
      </textarea>
      <lib-form-clear matSuffix [form]="form" [name]="name"></lib-form-clear>
    </mat-form-field>`
})
export class MazFormTextareaComponent extends AbstractMazinput {
  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name: string = '';
  @Input() label: string = '';
}
