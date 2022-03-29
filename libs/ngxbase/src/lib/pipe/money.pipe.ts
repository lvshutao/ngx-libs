import {Pipe, PipeTransform} from '@angular/core';

import {MyMoney} from "my-tsbase";


@Pipe({name: 'mymoney', pure: true})
export class MyMoneyPipe implements PipeTransform {

  transform(value: number, fixed?: number): string {
    if (value == 0) {
      return '0';
    }
    if (fixed) {
      return MyMoney.formatter(value.toFixed(fixed));
    }
    return MyMoney.formatter('' + value);
  }
}
