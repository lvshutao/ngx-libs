import {Component, Input} from "@angular/core";
import {MatDrawerMode} from "@angular/material/sidenav/drawer";

@Component({
  selector: 'lib-sidenav',
  template: `
    <mat-sidenav-container class="row lib-sidenav height-100vh">
      <mat-sidenav class="sidenav1"
                   [mode]="mode"
                   [opened]="display"
      >
        <ng-content select="[name=sidenav]"></ng-content>
      </mat-sidenav>
<!-- 没有设置 100% 内容区域过长时会出现滚动条，导致双重滚动条 -->
      <mat-sidenav-content style="width: 100%;" class="sidenav-content1">
        <div class="content1">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidenavComponent {
  @Input() mode: MatDrawerMode = 'side';
  @Input() display = true;
}
