import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ThemePalette} from "@angular/material/core/common-behaviors/color";

import {LayoutService} from "../service/layout.service";

@Component({
  selector: 'lib-layout',
  template: `
    <mat-drawer-container class="lib-layout">
      <!-- 左侧内容 -->

      <mat-drawer *ngIf="layoutSer.useLeft" mode="over" position="start" [(opened)]="layoutSer.leftOpened">
        <!-- height:100vh; -->
        <div class="column side-left1">
          <ng-content select="[name=left]"></ng-content>
        </div>
      </mat-drawer>

      <!-- 右侧内容 -->
      <mat-drawer *ngIf="layoutSer.useRight" mode="over" position="end" [(opened)]="layoutSer.rightOpened">
        <div class="column side-right1">
          <ng-content select="[name=right]"></ng-content>
        </div>
      </mat-drawer>
      <!-- height: 100vh;width:100%;display: flex; -->
      <mat-drawer-content style="" class="column drawer-outlet1">
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
        <div class="column flex1 draw-outlet2">
          <div style="flex: 1;" class="draw-outlet3">
            <!-- 通常放置一个 router-outlet -->
            <ng-content></ng-content>
          </div>
        </div>
        <!-- 底部内容 -->
        <ng-content select="[name=footer]"></ng-content>
      </mat-drawer-content>
    </mat-drawer-container>`,
  styles: [`div.side-left1 {
    height: 100vh;
  }

  mat-drawer-content.drawer-outlet1 {
    height: 100vh;
    width: 100%;
    display: flex;
  }`]
})
export class LibLayoutComponent {

  @Input() home = '';
  @Input() color: ThemePalette | undefined;
  @Output() index = new EventEmitter();

  constructor(public layoutSer: LayoutService) {
  }
}
