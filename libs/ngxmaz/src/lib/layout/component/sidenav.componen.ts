import {Component, Input} from "@angular/core";
import {MatDrawerMode} from "@angular/material/sidenav/drawer";

@Component({
  selector: 'lib-sidenav',
  template: `
    <mat-sidenav-container class="row lib-sidenav">
      <mat-sidenav #sidenav class="sidenav1"
                   [mode]="mode"
                   [opened]="display"
      >
        <ng-content select="[name=sidenav]"></ng-content>
      </mat-sidenav>

      <mat-sidenav-content style="width: 100%;" class="sidenav-content1">
        <!-- 提示信息 -->
        <ng-content select="[name=message]"></ng-content>
        <div class="content1">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidenavComponent {
  @Input() mode: MatDrawerMode = 'side';
  @Input() display: boolean = true;
}
