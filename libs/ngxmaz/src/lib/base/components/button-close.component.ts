import {Component} from '@angular/core';

// 自定义清除，注意添加 matSuffix (S大写)
@Component({
  selector: 'lib-close-button',
  template: `<a mat-icon-button aria-label="Clear">
    <mat-icon>close</mat-icon>
  </a>`,
})
export class ButtonCloseComponent {
}

