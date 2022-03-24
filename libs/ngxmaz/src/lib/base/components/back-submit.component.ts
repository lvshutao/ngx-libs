import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-back-submit',
  template: `
    <div style="padding: 20px 10px;">
      <a mat-flat-button (click)="back()">返回</a>
      <button style="margin: 0 15px" mat-flat-button color="primary" [disabled]="disabled">{{text}}</button>
      <ng-content></ng-content>
    </div>`,
})
export class BackSubmitComponent {
  @Input() text = '保存';
  @Input() disabled = true;

  back() {
    history.back();
  }
}
