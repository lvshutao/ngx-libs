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

  /**
   * @deprecated 使用 new FormControl({value: '', disabled: true}) 代替
   */
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set disabled(value: BooleanInput) {
    this._disabled = hasTrue(value)
    console.log('_disabled:', this._disabled)
  }

  private _disabled = false;

  get readonly(): boolean {
    return this._readonly;
  }

  @Input()
  set readonly(value: BooleanInput) {
    this._readonly = hasTrue(value)
    console.log('_readonly:', this._readonly)
  }

  private _readonly = false;
}

// 只要有设置值，并且值不为 false，就是真值
function hasTrue(value: BooleanInput) {
  return !(value === false || value === 'false')
}
