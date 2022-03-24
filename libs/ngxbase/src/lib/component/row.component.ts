import {Component, Input} from '@angular/core';

// <ng-container name="title"></ng-container>
@Component({
  selector: 'lib-row',
  template: `
    <div class="row lib-row">
      <div style="width: 120px;text-align: right;" class="lib-row-left">
        <span *ngIf="required" class="danger">*</span>
        <ng-content select="[name=title]"></ng-content>
      </div>
      <div class="flex1 lib-row-right" style="padding-left: 20px;">
        <ng-content></ng-content>
      </div>
    </div>`,
})
export class LibRowComponent {
  @Input() required: boolean = false;
}

// 4 个字
@Component({
  selector: 'lib-row-title4',
  template: `
    <div class="row lib-row-title4">
      <div style="width: 120px;text-align: right;padding-top: 18px;" class="placeholder-title lib-row-title4-left">
        <span *ngIf="required" class="danger">*</span>
        {{label}}
      </div>
      <div class="flex1 lib-row-title4-right" style="padding-left: 20px;">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LibRowTitle4Component {
  @Input() required: boolean = false;
  @Input() label = '';
}
