import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ImagePreview} from "@fsl/ngxbase";

import {LibDialogService} from "../dialog/dialog.service";

@Component({
  selector: 'lib-images',
  template: `
    <div class="row" style="flex-flow: wrap;" *ngIf="urls">
      <div class="img-block" [ngClass]="previewClass" *ngFor="let src of urls;let i = index;">
        <lib-image [style]="previewStyle" (click)="bindClick(src)" [src]="src"></lib-image>
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
  }`]
})
export class ImagesComponent {
  @Input() urls: string[] = [];

  /**
   * 启用预览
   */
  @Input() imagePreview = true;
  @Input() preview: ImagePreview = 'square';

  @Output() action = new EventEmitter<string>();

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

  constructor(private dialogSer: LibDialogService) {
  }


  bindClick(src: string) {
    if (this.imagePreview) {
      this.dialogSer.openImage(src); // 是否要支持上一页、下一页
    } else {
      this.action.emit(src);
    }
  }

}
