import {Component, Input} from "@angular/core";
import {MatDrawerMode} from "@angular/material/sidenav/drawer";
import {LayoutService} from "../service/layout.service";

@Component({
  selector: 'lib-sidenav',
  template: `
    <!--  height-100vh -->
    <mat-sidenav-container [ngClass]="ngClass" class="row lib-sidenav">
      <mat-sidenav class="sidenav1"
                   [mode]="mode"
                   [opened]="display"
                   (openedChange)="openChange($event)"
      >
        <ng-content select="[name=sidenav]"></ng-content>
      </mat-sidenav>
      <!-- 没有设置 100% 内容区域过长时会出现滚动条，导致双重滚动条
      设置 100% 后，在扣除左侧栏，否则内容区域又太长
      -->
      <mat-sidenav-content style="" class="sidenav-content1">
        <div class="content1">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .auto-lib-sidenav {
      height: calc(100vh - 64px);
    }
  `]
})
/**
 * 自行设置高度
 * .lib-sidenav {
 *    height: calc(100vh-64px);
 * }
 */
export class SidenavComponent {
  @Input() mode: MatDrawerMode = 'side';
  @Input() display = true;
  /**
   * 使用内置的样式 height:calc(100vh-64px)
   */
  @Input() calc = true;

  constructor(
    private layoutSer: LayoutService,
  ) {
  }

  get ngClass() {
    return this.calc ? 'auto-lib-sidenav' : '';
  }

  openChange(open: boolean) {
    this.layoutSer.selfLeft = open
  }
}
