import {Component} from '@angular/core';

// 自定义清除，注意添加 matSuffix (S大写)
@Component({
  selector: 'lib-close-button',
  template: `<a mat-icon-button aria-label="Clear">
    <mat-icon>close</mat-icon>
  </a>`,
})
export class CloseButtonComponent {
}

/*
使用示例：注意 matSuffix 是大写，不是小写（可能 ide 会自动转为全小写）

<lib-input4 label="联系电话*">
  <mat-form-field floatLabel="never">
    <input matInput formControlName="phone">
    <lib-clear matSuffix [form]="form" name="phone"></lib-clear>
  </mat-form-field>
</lib-input4>
 */
