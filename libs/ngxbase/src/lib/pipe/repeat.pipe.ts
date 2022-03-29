import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'myrepeat'})
export class MyRepeatPipe implements PipeTransform {
  transform(value: any, times: number) {
    return value.repeat(times);
  }
}

// https://angular.io/api/core/PipeTransform
// {{ 'ok' | repeat:3 }}
