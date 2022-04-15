import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {ImagePreview} from "@fsl/ngxbase";

@Component({
  selector: 'lib-form-image',
  template: `
    <div class="row" [formGroup]="form">
      <div class="width200">
        <lib-upload-form-one [preview]="preview" [form]="form" [name]="name" [text]="label"></lib-upload-form-one>
      </div>
      <div class="flex1">
        <lib-form-input [form]="form" [name]="name" [label]="label"></lib-form-input>

        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MazFormImageComponent {
  @Input() form!: FormGroup;
  @Input() preview: ImagePreview = 'square';
  @Input() name = ''
  @Input() label = '';
}
