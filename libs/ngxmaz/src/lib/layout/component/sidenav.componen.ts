import {Component, Input} from "@angular/core";
import {MatDrawerMode} from "@angular/material/sidenav/drawer";

@Component({
  selector: 'lib-sidenav',
  template: `
    <mat-sidenav-container class="row display1">
      <mat-sidenav #sidenav class="display1-sidenav"
                   [mode]="mode"
                   [opened]="display"
      >
        <ng-content select="[name=sidenav]"></ng-content>
      </mat-sidenav>

      <mat-sidenav-content style="width: 100%;" class="display1-sidenav-content">
        <!-- 提示信息 -->
        <ng-content select="[name=message]"></ng-content>
        <div class="display1-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .display1 .display1-sidenav {
      width: 150px;
    }

    .display1 .display1-content {
      height: 100%;
    }

    .display1 .display1-sidenav-content {
      height: calc(100vh - 64px);
    }

  `]
})
export class SidenavComponent {
  @Input() mode: MatDrawerMode = 'side';
  @Input() display: boolean = true;
}
