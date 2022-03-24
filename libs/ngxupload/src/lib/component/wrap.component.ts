import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MySecret} from "my-tsbase";

import {AllowImageType} from "../model";

@Component({
  selector: 'lib-upload-wrap',
  template: `<label for="{{name}}"><ng-content></ng-content></label>
  <lib-upload-hide [allowType]="allowType" [idName]="name" [multiple]="false"
                   (action)="action.emit($event)"></lib-upload-hide>
  `
})
/**
 * 包裹自定义上传的组件
 * @example
 * <lib-upload-wrap selector should start with one of these prefixes: "fsl" -upload-wrap>
 * <a mat-stroked-button><mat-icon>image</mat-icon>图片选择</a>
 * </lib-upload-wrap>
 */
export class LibUploadWrapComponent {
  @Input() name = MySecret.randomString(5);
  @Input() allowType = AllowImageType; // 允许的类型

  @Output() action = new EventEmitter<string>();
}
