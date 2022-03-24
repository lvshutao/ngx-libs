import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FloatLabelType} from "@angular/material/form-field";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {MyDatetime} from "my-tsbase";

import {AppBaseConfig} from "@fsl/ngxbase";

@Component({
  selector: 'lib-time',
  templateUrl: 'time.html',
})
export class LibTimeComponent {
  public value = '';
  @Output() timeChange = new EventEmitter<string>();

  @Input() label = '时间';
  @Input() floatLabel: FloatLabelType = 'auto';

  @Input()
  set initValue(v: string | number) {
    // console.log('datetime.time init with value:', v);
    if (v == '' || this.value == v) {
      return;
    }
    if (('' + v).length == 5) { // HH:mm 格式
      this.value = '' + v;
    } else if (('' + v).length == 8) { // HH:mm:ss 格式
      this.value = ('' + v).substr(0, 5);
    } else if (MyDatetime.isDate(v)) {
      const dt = MyDatetime.formatYmdHm(v);
      this.value = dt.time;
    }
  }

  constructor(private conf: AppBaseConfig) {
  }

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  clear() {
    this.value = '';
    this.timeChange.emit('');
  }

  change(time: string) {
    if (this.conf.debug) {
      console.log('time change:', time, 'value:', this.value);
    }
    this.timeChange.emit(time);
  }
}
