import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {LayoutService} from "../service/layout.service";

@Component({
  selector: 'lib-layout-sidenav',
  template: `
    <!-- 顶部工具栏 -->
    <mat-toolbar [color]="color" class="toolbar" role="banner">
      <button mat-icon-button (click)="layoutSer.leftToggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <!-- 站点标题 -->
      <span (click)="index.emit()">{{home}}</span>
      <div class="flex1"></div>
      <!--  右侧内容 -->
      <ng-content select="[name=toolbar]"></ng-content>
    </mat-toolbar>

    <mat-drawer-container class="lib-layout-sidenav flex1" autosize>
      <mat-drawer *ngIf="layoutSer.useLeft" mode="side" [(opened)]="layoutSer.leftOpened">
        <div class="column side-left1">
          <ng-content select="[name=left]"></ng-content>
        </div>
      </mat-drawer>

      <mat-drawer-content style="" class="column drawer-outlet1">
        <!-- 正文内容 -->
        <div class="column flex1 draw-outlet2">
          <div style="flex: 1;" class="draw-outlet3">
            <!-- 通常放置一个 router-outlet -->
            <ng-content></ng-content>
          </div>
        </div>
      </mat-drawer-content>
    </mat-drawer-container>`,
  styles: [`
    :host {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class LayoutSidenavComponent {
  @Input() home = '';
  @Input() color: ThemePalette | undefined;
  @Output() index = new EventEmitter();

  constructor(public layoutSer: LayoutService) {
  }
}
