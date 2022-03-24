import {Component} from "@angular/core";

@Component({
  selector: 'lib-desktop',
  template: `
    <div class="if-desktop">
      <div class="width-desktop">
        <ng-content></ng-content>
      </div>
    </div>`
})
export class LibDesktopComponent {

}

@Component({
  selector: 'lib-desktop-row',
  template: `
    <div class="if-desktop">
      <div class="rows">
        <!-- 左侧内容 -->
        <div style="margin: 0;width: 1000px;">
          <ng-content></ng-content>
        </div>
        <!-- 右侧内容 name='right' -->
        <div class="flex1" style="border-left: 1px dashed grey;">
          <ng-content select="[name=right]"></ng-content>
        </div>
      </div>

    </div>`
})
export class LibDesktopRowComponent {

}

@Component({
  selector: 'lib-mobile',
  template: `
    <div class="if-mobile">
      <ng-content></ng-content>
    </div>`
})
export class LibMobileComponent {
}
