import {Component, EventEmitter, Input, Output} from "@angular/core";
import {moveItemInArray} from "@angular/cdk/drag-drop";

import {ImagePreview} from '@fsl/ngxbase'

import {LibDialogService} from "../dialog/dialog.service";

// https://material.angular.cn/cdk/drag-drop/overview
// 不使用 ckDrop

@Component({
  selector: 'lib-images',
  template: `
    <div class="row" style="flex-flow: wrap;" *ngIf="urls">
      <div class="img-block" [ngClass]="previewClasses" *ngFor="let src of urls;let i = index;">
        <lib-image [style]="style" (click)="bindClick(src)" [src]="src"></lib-image>
        <div class="img-actions" *ngIf="showAction">
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
    </div>`,
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
export class ImagesComponent {
  @Input() urls: string[] = [];
  @Input() showAction = false;
  @Input() imagePreview = true;
  @Input() preview: ImagePreview = 'square';
  @Output() action = new EventEmitter<string>();

  get style() {
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

  constructor(private dialogSer: LibDialogService) {
  }

  onDelete(index: number) {
    this.urls.splice(index, 1);
  }

  upward(index: number) {
    if (this.disUpward(index)) {
      return;
    }
    moveItemInArray(this.urls, index, index - 1);
  }

  downward(index: number) {
    if (this.disUpward(index)) {
      return;
    }
    moveItemInArray(this.urls, index, index + 1);
  }

  disUpward(index: number) {
    return index == 0 || this.len < 2;
  }

  disDownward(index: number) {
    return this.len < 2 || index == this.len - 1;
  }

  get len() {
    return this.urls.length;
  }

  get previewClasses() {
    switch (this.preview) {
      case 'square':
        return 'def-img-square-size';
      default:
        return 'def-img-block-size';
    }
  }

  bindClick(src: string) {
    if (this.imagePreview) {
      this.dialogSer.openImage(src); // 是否要支持上一页、下一页
    } else {
      this.action.emit(src);
    }
  }
}
