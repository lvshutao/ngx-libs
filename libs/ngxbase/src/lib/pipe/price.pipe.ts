// 将分转为元
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'my-price', pure: true})
export class MyPricePipe implements PipeTransform {

  transform(value: number): number {
    return value / 100;
  }
}
