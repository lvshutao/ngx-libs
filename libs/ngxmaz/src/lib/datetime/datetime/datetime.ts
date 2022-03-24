import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FloatLabelType} from "@angular/material/form-field";
import {MyAssets, MyDatetime} from "my-tsbase";

import {AppBaseConfig} from "@fsl/ngxbase";


@Component({
  selector: 'lib-datetime',
  templateUrl: 'datetime.html',
})
export class LibDatetimeComponent {
  @Input() date = '';
  @Input() time = '';
  @Input() dateText = '日期';
  @Input() timeText = '时间';
  @Input() floatLabel: FloatLabelType = 'always';

  private hasInit = false;

  @Input()
  set initValue(v: string | number) {

    // console.log('datetime initValue with:', v);
    if (!this.hasInit && MyDatetime.isDate(v)) {
      this.hasInit = true;
      const text = MyDatetime.formatYmdHm(v);
      // console.log('date:', text.date, 'time:', text.time);
      this._date = this.date = text.date;
      this._time = this.time = text.time;
    }
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<string>();

  constructor(private conf: AppBaseConfig) {
  }

  private _date = ''; // 内部日期
  private _time = ''; // 内部时间

  dateChange(text: string | number) {
    // 兼容性处理，不能删：线上的 js 可能是数字
    if (this.conf.debug) {
      console.log('datetime.index:dateChange:', text, typeof text);
    }
    if (MyAssets.isNumber(text)) {
      if (text < 1) {
        this._date = '';
      } else {
        const t = MyDatetime.parseNewDate(text);
        if (t) {
          const d = MyDatetime.explodeDate(t);
          this._date = d.date;
        }
      }
    } else if (('' + text).length < 3) {
      this.date = '';
    } else {
      const d = MyDatetime.explodeDate(new Date(text));
      this._date = d.date;
    }
    this.textChange();
  }

  timeChange(text: string) {
    this._time = text;
    this.textChange();
  }

  private textChange() {
    if (this._date.length < 3) {
      this.change.emit('');
      return;
    }
    if (this._time.length < 2) {
      this._time = '00:00';
    }
    this.change.emit([this._date, this._time + ':00'].join(' '));
  }
}
