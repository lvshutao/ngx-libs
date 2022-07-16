import {Component, EventEmitter, Input, Output} from "@angular/core";
import {LibDialogService} from "@fsl/ngxmaz";
import {MyAppxApiConfig} from "../../api-config";

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
    private dialogSer: LibDialogService,
    private apiConfig: MyAppxApiConfig,
  ) {
  }

  bindShow() {
    if (this.disabled) {
      console.log('disabled the captcha')
      return;
    }

    this.dialogSer.imageCaptcha({
      captchaId: this.apiConfig.captchaId,
      captchaSrc: this.apiConfig.captchaSrc,
    }).subscribe(data => {
      if (data) {
        this.success.emit({sec: data});
      }
    })
  }
}
