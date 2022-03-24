import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ThemePalette} from "@angular/material/core/common-behaviors/color";

import {LayoutService} from "../service/layout.service";

@Component({
  selector: 'lib-layout',
  template: `
    <mat-drawer-container>
      <!-- 左侧内容 -->

      <mat-drawer mode="over" position="start" [opened]="layoutSer.leftOpened">
        <div class="column" style="height: 100vh;">
          <ng-content select="[name=left]"></ng-content>
        </div>
      </mat-drawer>

      <!-- 右侧内容 -->
      <mat-drawer mode="over" position="end" [opened]="layoutSer.rightOpened">
        <div class="column" style="height: 100vh;">
          <ng-content select="[name=right]"></ng-content>
        </div>
      </mat-drawer>
<!--mat-drawer-content {display:block}-->
      <mat-drawer-content style="height: 100vh;width:100%;display: flex;" class="column">
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

        <!-- 正文内容 -->
        <div class="column base-main flex1">
          <div style="flex: 1;" class="base-main-top">
<!-- 通常放置一个 router-outlet -->
            <ng-content></ng-content>
          </div>
        </div>
        <!-- 底部内容 -->
        <ng-content select="[name=footer]"></ng-content>
      </mat-drawer-content>
    </mat-drawer-container>`
})
export class LibLayoutComponent {

  @Input() home = '';
  @Input() color: ThemePalette | undefined;
  @Output() index = new EventEmitter();

  constructor(public layoutSer: LayoutService) {
  }
}
