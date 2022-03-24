import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lib-dialog-bar',
  template: `
    <div mat-dialog-actions align="end">
      <a mat-button autofocus mat-dialog-close>{{cancelText}}</a>
      <ng-content></ng-content>
      <a mat-button color="primary" [disabled]="disabled" (click)="submit.emit()">{{submitText}}</a>
    </div>`
})
export class DialogBarComponent {
  @Input() cancelText = '关闭';
  @Input() submitText = '确定';
  @Input() disabled = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit = new EventEmitter();
}
