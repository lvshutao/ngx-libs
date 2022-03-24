import {Component, Input} from '@angular/core';


@Component({
  selector: 'lib-avatar',
  template: `
    <div class="row lib-avatar">
      <div *ngIf="src"><img [src]="src" class="avatar40" style="margin-right: 10px;" [alt]="alt"></div>
      <div class="flex1">
        <ng-content></ng-content>
      </div>
    </div>`,
})
/**
 * 图像 40px*40px，右侧内容可自定义
 */
export class LibAvatarComponent {
  @Input() src = '';
  @Input() alt = '';
}

@Component({
  selector: 'lib-avatar-name',
  template: `
    <div style="display: inline-block;height: 40px;line-height: 40px;" class="lib-avatar-name">
      <img [src]="src" class="avatar" style=""><span>{{name}}</span>
    </div>
  `,
  styles: [`.avatar {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
  }`]
})
/**
 * 图标只有 20px*20px，文字在图标的右侧；适合参加人员之类的场景
 */
export class LibAvatarNameComponent {
  @Input() src = '';
  @Input() name = '';
}
