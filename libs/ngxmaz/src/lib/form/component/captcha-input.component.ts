import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lib-captcha-input',
  template: `
    <div class="row">
      <mat-form-field class="flex1" style="max-width: 150px;">
        <input matInput
               (keyup)="codeChange()" [(ngModel)]="code"
               [minLength]="minLength"
               [maxLength]="maxLength"
               placeholder="验证码">
        <a mat-button *ngIf="code"
           matSuffix mat-icon-button
           aria-label="清空验证码" (click)="reset()">
          <mat-icon>close</mat-icon>
        </a>
      </mat-form-field>
      <!-- 通常显示一个验证码图片 -->
      <ng-content></ng-content>
    </div>`
})
/**
 * 验证码输入框
 */
export class CaptchaInputComponent {
  @Input() minLength = 4;
  @Input() maxLength = 6;

  @Output() action = new EventEmitter<string>();
  code = '';

  codeChange() {
    this.action.emit(this.code);
  }

  reset() {
    this.code = '';
    this.codeChange();
  }
}
