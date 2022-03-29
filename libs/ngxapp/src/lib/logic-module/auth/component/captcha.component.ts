import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ImageCaptchaDialog} from "./image-captcha.dialog";

@Component({
  selector: 'lib-captcha',
  template: `
    <div style="display: inline;" (click)="bindShow()">
      <ng-content></ng-content>
    </div>
  `
})
export class LibCaptchaComponent {
  @Input() disabled = true; // 能否点击
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() success = new EventEmitter<any>(); // 返回一个对象，与后端相对

  constructor(
    private dialogSer: MatDialog,
  ) {
  }

  bindShow() {
    if (this.disabled) {
      console.log('disabled the captcha')
      return;
    }

    this.dialogSer.open(ImageCaptchaDialog).afterClosed().subscribe(data => {
      if (data) {
        this.success.emit({sec: data});
      }
    })
  }
}
