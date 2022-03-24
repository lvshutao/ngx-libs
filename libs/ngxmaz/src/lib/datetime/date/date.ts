import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FloatLabelType} from "@angular/material/form-field";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

import {MyDatetime} from "my-tsbase";
import {AppBaseConfig} from "@fsl/ngxbase";

import {myMoment} from "../moment";


@Component({
  selector: 'lib-date',
  templateUrl: 'date.html',
})
export class LibDateComponent {
  public value: any = '';

  @Input() label = '日期';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() width = 100;
  @Input() action = true;

  @Output() dateChange = new EventEmitter<string | number>(); // 如果需要提取 Datetime.dateText
  @Output() ymdChange = new EventEmitter<string>();

  @Input()
  set initValue(v: string | number) {
    if (this.conf.debug) {
      console.log('datetime.date init with value:', v, ';origin value:', this.value);
    }
    if (v == this.value) {
      return;
    }
    if (MyDatetime.isDate(v)) {
      const date = MyDatetime.parseNewDate(v);
      this.value = date ? MyDatetime.formatDateText(date) : '';
      if (this.conf.debug) {
        console.log('datetime.date:', this.value);
      }
    } else if (this.conf.debug) {
      console.log(v, ' is not Date');
    }
  }

  constructor(private conf: AppBaseConfig) {
  }

  clear() {
    this.value = '';
    this.dateChange.emit('');
  }

  change(event: MatDatepickerInputEvent<any>) {
    const date = `${event.value}`;
    const newDate = MyDatetime.dateText(date);
    if (this.conf.debug) {
      console.log('maz.date change:', date, typeof date, newDate);
    }
    if (newDate != this.value) {
      this.dateChange.emit(date); // 字符串
      this.ymdChange.emit(newDate);
    }
  }

  bindPre() {
    this.changeDate(-1);
  }

  bindNext() {
    this.changeDate(1);
  }

  changeDate(cha: number) {
    let ymd;
    if (this.value == '') {
      ymd = MyDatetime.dateText(new Date());
    } else {
      const m = myMoment(this.value).add(cha, 'd');
      ymd = m.format('YYYY-MM-DD');
    }
    this.dateChange.emit(ymd);
    this.ymdChange.emit(ymd);
  }
}
