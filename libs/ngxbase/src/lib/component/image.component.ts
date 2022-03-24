import {Component, EventEmitter, Input, Output} from "@angular/core";

import {qiniuThumb} from "../util/function";
import {MyHtml} from "my-tsbase";

export type ImagePreview = 'square' | 'banner360' | 'banner720' | 'banner100' | 'avatar' | 'ad' | 'card';

export function getImagePreviewClasses(style: ImagePreview): string {
  switch (style) {
    case 'square':
      return 'size-square'; // 100 * 100
    case 'banner360':
      return 'size-banner-middle'; // 360 * 172，接近 2:1
    case 'banner720':
      return 'size-banner-large'; // 720 * 345, 接近 48:23 => 2:1
    case 'banner100':
      return 'size-banner-small'; // 100 * 48，接近 2:1
    case 'avatar':
      return 'avatar40'; // 40 * 40, border-radius:50%
    case 'ad':
      return 'size-ad'; // 120 * 200
    case 'card': // 名片
      return 'size-card'; // 200 * 120
    default:
      return 'size-square';
  }
}

@Component({
  selector: 'lib-image',
  template: `
    <div style="display: inline-block;" *ngIf="imgSrc" [ngClass]="ngClass" [ngStyle]="style">
      <div class="image-bg-cover" [ngStyle]="styles"></div>
    </div>`,
})
export class LibImageComponent {
  @Input() src = ''; // 图片地址
  @Input() preview: ImagePreview = 'square'; // 样式
  @Input() style: any = {};
  @Input() thumb: boolean = true;

  get styles() {
    return MyHtml.backgroundImageUrlStyle(this.src);
  }

  get ngClass(): string {
    return getImagePreviewClasses(this.preview);
  }

  get imgSrc(): string {
    if (this.src) {
      return this.thumb ? qiniuThumb(this.src) : this.src;
    } else {
      return '';
    }
  }
}

// 九宫格显示
@Component({
  selector: 'lib-images-grid',
  template: `
    <div class="lib-images-grid" *ngIf="showImages" style="overflow: hidden;">
      <div [ngStyle]="{width:space-5+'px'}" style="padding: 5px 0 0 5px;position: relative;">
        <div *ngFor="let src of showImages" [ngStyle]="divStyle">
          <div (click)="onClick.emit(src)" class="image-bg-cover" [ngStyle]="style(src)"></div>
        </div>
      </div>
    </div>
  `
})
export class LibImagesGridComponent {

  showImages: string[] = [];
  padding = 5; // 间隙
  size = 60;
  divStyle = {};

  @Input() space = 4 * 5 + 60 * 3; // 空间 200
  @Input() bgSize = 'cover';

  @Input()
  set images(s: string[]) {
    if (s == null) {
      return;
    }
    this.showImages = s;
    switch (this.showImages.length) {
      case 1:
        this.size = this.space - this.padding * 2;
        break;
      default:
        this.size = Math.ceil((this.space - this.padding * 4) / 3);
        break;
    }
    this.divStyle = {
      width: this.size + 'px',
      height: this.size + 'px',
      'margin-right': '5px',
      'margin-bottom': '5px',
      float: 'left',
    };
  }

  @Output() onClick = new EventEmitter<string>();

  style(src: string) {
    return MyHtml.backgroundImageUrlStyle(src, this.bgSize);
  }
}
