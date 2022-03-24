import {Component} from "@angular/core";

@Component({
  selector: 'lib-map-layout',
  template: `
    <div class="row">
      <div class="flex1">
        <ng-content></ng-content>
      </div>
      <div style="width: 610px;padding-left: 10px;">
        <ng-content select="[name=right]"></ng-content>
      </div>
    </div>`
})
export class LibMapLayoutComponent {
}
