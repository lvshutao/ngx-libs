/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {setUploadFileConfig, UploadFileConfig} from "@fsl/ngxupload";
import {ArrayService, ImagePreview} from "@fsl/ngxbase";
import {LibDialogService} from "../../base/dialog/dialog.service";

/*
<lib-form-images [form]="mo"></lib-form-images>
 */
@Component({
  selector: 'lib-form-images',
  template: `<a mat-stroked-button [disabled]="disabled"
                (click)="onImageTrigger()">
    <mat-icon>image</mat-icon>
    {{label}}</a>
  <lib-circle-button (click)="onAppend()"></lib-circle-button>
  <lib-upload-trigger
    *ngIf="upload"
    [trigger]="open"
    (action)="onImageUpload($event)"></lib-upload-trigger>
  <div style="margin-bottom: 5px;"></div>
  <!-- 图片操作 -->
  <div class="row" style="flex-flow: wrap;" *ngIf="images">
    <div class="img-block" [ngClass]="previewClass" *ngFor="let src of images;let i = index;">
      <lib-image [style]="previewStyle" (click)="onImagePreview(src)" [src]="src"></lib-image>
      <div class="img-actions">
        <a mat-icon-button color="accent" (click)="onEdit(i)">
          <mat-icon>edit</mat-icon>
        </a>
        <a mat-icon-button color="accent" [disabled]="disUpward(i)" (click)="upward(i)">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <a mat-icon-button color="accent" [disabled]="disDownward(i)" (click)="downward(i)">
          <mat-icon>arrow_forward</mat-icon>
        </a>
        <a mat-icon-button color="warn" (click)="onDelete(i)">
          <mat-icon>delete</mat-icon>
        </a>
      </div>
    </div>
  </div>
  `,
  providers: [
    {provide: UploadFileConfig, useValue: setUploadFileConfig({multiple: true})}
  ],
  styles: [`.img-block {
    background: #efefef;
    position: relative;
    margin: 0 5px 5px 0;
  }

  .def-img-block-size {
    width: 200px;
    height: 120px;
  }

  .def-img-square-size {
    width: 200px;
    height: 200px;
  }

  .img-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(1, 1, 1, 0.2);
    width: 100%;
    text-align: right;
    z-index: 1;
  }`]
})
export class LibFormImagesComponent {
  open = false;

  @Input() form!: FormGroup;
  @Input() name = 'images';
  @Input() preview: ImagePreview = 'square';
  @Input() upload = true; // 默认显示上传按钮
  @Input() label = '图片展示';
  @Input() max = 9; // 允许上传的最大图片数量

  @Output() action = new EventEmitter(); // 触发上传事件

  constructor(
    private dialogSer: LibDialogService,
  ) {
  }


  get previewClass() {
    switch (this.preview) {
      case 'square':
        return 'def-img-square-size';
      default:
        return 'def-img-block-size';
    }
  }

  get previewStyle() {
    switch (this.preview) {
      case 'square':
        return {
          width: '200px', height: '200px',
        };
      default:
        return {
          width: '200px', height: '120px',
        };
    }
  }

  onImagePreview(src: string) {
    this.dialogSer.openImage(src);
  }

  onImageTrigger() {
    if (this.upload) {
      this.open = !this.open;
    } else {
      this.action.emit();
    }
  }

  get images(): Array<string> {
    return this.form.get(this.name)?.value as Array<string> || [];
  }

  disUpward(i: number) {
    return ArrayService.disUpward(i, this.images);
  }

  upward(i: number) {
    ArrayService.onUpward(i, this.images)
  }

  downward(i: number) {
    ArrayService.onDownward(i, this.images);
  }

  disDownward(i: number) {
    return ArrayService.disDownward(i, this.images)
  }

  onDelete(i: number) {
    ArrayService.onDelete(i, this.images);
  }

  onEdit(i: number) {
    this.dialogSer.input({
      title: '图片地址',
      content: this.images[i]
    }, {width: '60%'}).subscribe(src => {
      if (src) {
        this.images[i] = src;
      }
    })
  }

  onAppend() {
    this.dialogSer.input({
      title: '新图片地址',
      content: ''
    }, {width: '60%'}).subscribe(src => {
      if (src) {
        this.onInsert(src);
      }
    })
  }

  onInsert(src: string) {
    const images = this.images;
    images.push(src);
    this.form.patchValue({[this.name]: images});
  }

  onImageUpload(data: any) {
    if (this.upload && this.form) {
      const src = data.url || data.src;
      this.onInsert(src);
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
