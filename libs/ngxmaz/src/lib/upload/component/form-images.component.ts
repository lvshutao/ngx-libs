/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {setUploadFileConfig, UploadFileConfig} from "@fsl/ngxupload";

/*
<lib-form-images [form]="mo"></lib-form-images>
<lib-form-images-action [form]="mo"></lib-form-images-action>
 */
@Component({
  selector: 'lib-form-images',
  template: `<a mat-stroked-button [disabled]="disabled"
                (click)="onImageTrigger()">
    <mat-icon>image</mat-icon>
    {{label}}</a>
  <lib-upload-trigger
    *ngIf="upload"
    [trigger]="open"
    (action)="onImageUpload($event)"></lib-upload-trigger>
  <div style="margin-bottom: 5px;"></div>
  `,
  providers: [
    {provide: UploadFileConfig, useValue: setUploadFileConfig({multiple: true})}
  ]
})
export class LibMazUploadFormImagesComponent {
  open = false;

  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name = 'images';
  @Input() upload = true; // 默认显示上传按钮
  @Input() label = '图片展示';
  @Input() max = 0; // 允许上传的最大图片数量


  @Output() action = new EventEmitter(); // 触发上传事件

  onImageTrigger() {
    if (this.upload) {
      this.open = !this.open;
    } else {
      this.action.emit();
    }
  }

  onImageUpload(data: any) {
    if (this.upload && this.form) {
      const src = data.url || data.src;
      // @ts-ignore
      const images = this.form.get(this.name).value as Array<string> || [];
      images.push(src);
      this.form.patchValue({[this.name]: images});
    }
  }

  get disabled(): boolean {
    if (this.max > 0 && this.form) {
      // @ts-ignore
      const images = this.form.get(this.name).value as Array<string> || [];
      return images.length >= this.max;
    }
    return false;
  }
}
