import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'lib-back-bar-submit',
  template: `
    <lib-back-bar>
      <span>{{isSave ? '更新' : '添加'}}{{label}}</span>
      <lib-hspace></lib-hspace>
      <a mat-button mat-flat-button color="primary" (click)="action.emit()" [disabled]="disabled">{{text}}</a>
    </lib-back-bar>`
})
export class BackBarSubmitComponent {
  @Input() isSave = false;
  @Input() label = '';
  @Input() disabled = false;
  @Input() text = '提交';

  @Output() action = new EventEmitter();
}
