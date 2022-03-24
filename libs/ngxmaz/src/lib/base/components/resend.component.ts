import {Component, Input} from '@angular/core';

/*
宽度  150px
倒计时： disabled 能够点击，start (开始倒计时), send 事件
 */
@Component({
  selector: 'lib-resend',
  template: `<a [disabled]="disabled || _running" mat-stroked-button>{{_title}}</a>`
})
export class ResendComponent {

  @Input() title = '发送验证码';
  @Input() seconds = 60; // 倒计时
  @Input() disabled = true; // 禁用状态

  _running = false; // 正在倒计算
  _title = this.title;

  private _currentSecond = 0;
  private timeInt = 0;
  private state = false;

  @Input()
  set start(newState: boolean) { // 当 start = true 时，开始显示倒计时
    if (this._running) {
      return;
    }
    if (this.state != newState) {
      this.state = newState;
      this._running = true;
      this._currentSecond = this.seconds;
      this.timeInt = setInterval(() => {
        this.onInterval();
      }, 1000);
    }
  }

  onInterval() {
    if (!this._running) {
      return;
    }
    if (this._currentSecond > 0) {
      this._currentSecond -= 1;
    } else {
      clearInterval(this.timeInt);
      this._running = false;
      this._title = this.title;
      return;
    }
    this._title = `${this._currentSecond}s 后重发`;
  }
}
