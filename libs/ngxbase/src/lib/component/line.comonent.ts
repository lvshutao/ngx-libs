import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-line',
  template: `
    <div style="line-height: 2em;position: relative;">
      <div style="border-bottom: 1px solid grey;
    position: absolute;
    top: 1em;
    width: 50%;
    z-index: -1;
    left: 25%;"></div>
      <div style="text-align: center;">

    <span [style.background]="bgColor" style="padding: 0 30px;
    color: grey;
    font-size: smaller;">{{text}}</span>
      </div>
    </div>
  `
})
export class LibLineComponent {
  @Input() bgColor = 'white';
  @Input() text = '没有了';
}
