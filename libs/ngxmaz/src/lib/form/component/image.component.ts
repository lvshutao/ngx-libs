import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {ImagePreview} from "@fsl/ngxbase";

@Component({
  selector: 'lib-form-image',
  template: `
    <div class="row" [formGroup]="form">
      <div class="width200">

        <lib-upload-one [preview]="preview"
                        [text]="label" [src]="src" (action)="change($event)"></lib-upload-one>

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
  @Input() name = ''
  @Input() preview: ImagePreview = 'square';
  @Input() label = '图片上传';

  get src(): string {
    // @ts-ignore
    return this.form && this.name ? this.form.get(this.name).value : '';
  }

  change(src: string) {
    this.form.patchValue({[this.name]: src});
  }
}
