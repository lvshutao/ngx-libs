import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MySecret} from "my-tsbase";

@Component({
  selector: 'lib-upload-avatar',
  template: `<label for="{{idName}}"
                    [style.border-radius.%]="radius"
                    style="display: inline-block;position: relative;overflow: hidden;">
    <img [ngStyle]="style" [src]="src" style="vertical-align: bottom;">
    <div style="position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,0.5);
    color: white;">编辑
    </div>
  </label>

  <lib-upload-hide [multiple]="false" [idName]="idName"
                   (action)="change($event)"></lib-upload-hide>
  `
})
/**
 * 圆形的头像
 */
export class LibUploadAvatarComponent {
  @Output() action = new EventEmitter<string>(); // 需要

  @Input() src = ''; // 需要
  @Input() size = 100;
  @Input() radius = 50;

  idName = MySecret.randomString(5)

  get style() {
    return {
      width: this.size + 'px',
      height: this.size + 'px',
      'border-radius': this.radius + '%',
    };
  }

  change(src: string) {
    this.action.emit(src);
    // this.idName = MySecret.randomString(4); // 不会改变
  }
}
