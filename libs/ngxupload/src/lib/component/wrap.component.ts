import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MySecret} from "my-tsbase";

@Component({
  selector: 'lib-upload-wrap',
  template: `<label for="{{name}}">
    <ng-content></ng-content>
  </label>
  <lib-upload-hide [idName]="name" (action)="action.emit($event)"></lib-upload-hide>
  `
})
/**
 * 包裹自定义上传的组件
 * @example
 * <lib-upload-wrap>
 * <a mat-stroked-button><mat-icon>image</mat-icon>图片选择</a>
 * </lib-upload-wrap>
 */
export class LibUploadWrapComponent {
  @Input() name = MySecret.randomString(5);

  @Output() action = new EventEmitter<string>();
}
