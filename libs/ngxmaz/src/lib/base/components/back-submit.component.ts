import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-back-submit',
  template: `
    <div style="padding: 20px 10px;">
      <a mat-flat-button (click)="back()">{{backText}}</a>
      <button style="margin: 0 15px" mat-flat-button color="primary" [disabled]="disabled">{{text}}</button>
      <ng-content></ng-content>
    </div>`,
})
export class BackSubmitComponent {
  @Input() backText = '返回';
  @Input() text = '保存';
  @Input() disabled = false;

  back() {
    history.back();
  }
}
