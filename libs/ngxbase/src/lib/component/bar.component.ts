import {Component} from '@angular/core';

@Component({
  selector: 'lib-bar',
  template: `
    <div style="min-height: 50px;margin-bottom:5px;" class="lib-bar">
      <div style="clear: both;overflow: hidden;padding: 5px;" class="line fixed-bar">
        <ng-content></ng-content>
      </div>
    </div>`
})
/**
 * 顶部固定
 */
export class LibBarComponent {

  constructor() {
  }

}
