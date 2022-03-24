/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {ImagePreview} from '@fsl/ngxbase'

@Component({
  selector: 'lib-mazupload-form-one',
  template: `
    <lib-mazupload-one
      [preview]="preview"
      [text]="text" [src]="src" (action)="change($event)"></lib-mazupload-one>
  `,
})
export class LibMazUploadFormOneComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name = 'cover';
  @Input() text = '封面上传';
  @Input() preview: ImagePreview = 'square';

  get src(): string {
    // @ts-ignore
    return this.form ? this.form.get(this.name).value : '';
  }

  change(src: string) {
    this.form.patchValue({[this.name]: src});
  }
}
