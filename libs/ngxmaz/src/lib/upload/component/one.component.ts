import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MySecret} from "my-tsbase";

import {ImagePreview,getImagePreviewClasses} from '@fsl/ngxbase'

@Component({
  selector: 'lib-upload-one',
  template: `
    <!-- 带有 上传、取消 按钮 -->
    <label for="{{idName}}">
      <a mat-stroked-button>
        <mat-icon>panorama</mat-icon>
        {{text}}
      </a>
    </label>

    <a *ngIf="src" mat-icon-button (click)="onClear()">
      <mat-icon>clear</mat-icon>
    </a>
    <div></div>
    <div *ngIf="src" class="pt10">
      <div [ngClass]="previewClasses"
           class="lib-image" [ngStyle]="styles"></div>
      <div class="pt10"></div>
    </div>

    <!-- 隐藏的上传按钮 -->
    <lib-upload-hide [idName]="idName" [multiple]="false" (action)="action.emit($event)"></lib-upload-hide>
  `,
  styles: [`.lib-image {
    background-size: cover;
    background-repeat: no-repeat;
  }`]
})
/**
 * 上传一张图片
 */
export class LibMazUploadOneComponent {
  @Input() src = '';
  @Input() text = '上传';
  @Input() idName = MySecret.randomString(5)
  @Input() preview: ImagePreview = 'square';

  @Output() action = new EventEmitter<string>();

  onClear() {
    this.src = '';
    this.action.emit('');
  }

  get styles() {
    if (this.src) {
      return {
        'background-image': `url('${this.src}')`,
      };
    }
    return {};
  }

  get previewClasses() {
    return getImagePreviewClasses(this.preview);
  }
}
