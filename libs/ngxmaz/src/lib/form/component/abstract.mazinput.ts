import {Component, Input} from "@angular/core";
import {BooleanInput} from "@angular/cdk/coercion";

@Component({template: ``})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AbstractMazinput {

  get required(): boolean {
    return this._required;
  }

  @Input()
  set required(value: BooleanInput) {
    this._required = hasTrue(value);
    console.log('isRequired:', this._required)
  }

  private _required = false
}

// 只要有设置值，并且值不为 false，就是真值
function hasTrue(value: BooleanInput) {
  return !(value === false || value === 'false')
}
