// 将分转为元
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'myprice', pure: true})
export class MyPricePipe implements PipeTransform {

  transform(value: number): number {
    return value / 100;
  }
}
