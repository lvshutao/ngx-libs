import {AbstractControl, FormGroup} from "@angular/forms";
import {Component, Input} from "@angular/core";

import {ImagePreview} from '@fsl/ngxbase'

@Component({
  selector: 'lib-form-images-action',
  template: `
    <lib-images [preview]="preview"
                [showAction]="true"
                [urls]="urls"></lib-images>`
})
/**
 * 图片调整
 * 通常跟 <lib-images [from]="m"></lib-images> 搭配使用
 */
export class ImagesActionComponent {
  @Input() form!: FormGroup | AbstractControl;
  @Input() name = 'images';
  @Input() preview: ImagePreview = 'square';

  get urls(): string[] {
    if (this.form && this.form.get(this.name) != null) {
      return this.form.get(this.name)?.value || [];
    }
    return [];
  }
}
