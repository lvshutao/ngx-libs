import {Pipe, PipeTransform} from '@angular/core';
import {MyAssets, MyDatetime} from "my-tsbase";

const empty = '0001-01-01T00:00:00Z';

@Pipe({name: 'my-date'})
/**
 * utc date
 * 将 golang 返回的时间转为 yyyy-mm-dd
 */
export class MyDatePipe implements PipeTransform {
  transform(value: any) {
    if (value === empty) {
      return '';
    }
    return MyDatetime.formatDateText(value);
  }
}

@Pipe({name: 'my-datetime'})
/**
 * utc date time
 * 将 golang 返回的时间转为 yyyy-mm-dd hh:ii
 */
export class MyDatetimePipe implements PipeTransform {
  transform(value: any) {
    if (value === empty || MyAssets.isEmpty(value)) {
      return '';
    }
    if (typeof value === 'string') {
      const text = MyDatetime.printDate(value);
      if (text !== '') {
        return text;
      }
    }
    const t = new Date(value);
    return MyDatetime.date2YMDHI(t);
  }
}


@Pipe({name: 'my-date-week'})
/**
 * 将返回的时间转为 yyyy-mm-dd(周几)
 */
export class MyDateWeekPipe implements PipeTransform {
  transform(value: any) {
    if (value === empty) {
      return '';
    }
    return MyDatetime.ymdWeek(value)
  }
}

@Pipe({name: 'my-datetime-week'})
/**
 * 将返回的时间转为 yyyy-mm-dd hh:MM(周几)
 */
export class MyDatetimeWeekPipe implements PipeTransform {
  transform(value: any) {
    if (value === empty) {
      return '';
    }
    return MyDatetime.ymdHiWeek(value);
  }
}
