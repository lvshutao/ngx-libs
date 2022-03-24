import {Component, Input} from "@angular/core";

import {SidenavMenu} from "../service/menu.service";


@Component({
  selector: 'lib-sidenav-menus',
  template: `
    <mat-accordion displayMode="flat" multi="true" *ngIf="hasMenus">
      <ng-container *ngFor="let m of menus">

        <!-- 有子菜单 -->
        <mat-nav-list *ngIf="m.children else one">
          <mat-expansion-panel [expanded]="m.expanded">
            <!-- 组标题 -->
            <mat-expansion-panel-header>{{m.text}}</mat-expansion-panel-header>
            <!-- 有 children 时，会自动将父 route 作为前辍-->
            <mat-nav-list dense>
              <a *ngFor="let n of m.children" mat-list-item
                 [class.disabled]="n.disabled || null"
                 [routerLink]="m.route ? m.route + n.route : n.route"
                 routerLinkActive="active"
              >
                <mat-icon *ngIf="m.icon" matListIcon>{{n.icon}}</mat-icon>
                <span>{{n.text}}</span>
              </a>
            </mat-nav-list>
          </mat-expansion-panel>
        </mat-nav-list>
        <!-- 没有子菜单 -->
        <ng-template #one>
          <a mat-list-item
             [class.disabled]="m.disabled || null"
             [routerLink]="m.route"
             routerLinkActive="active">
            <mat-icon *ngIf="m.icon" matListIcon>{{m.icon}}</mat-icon>
            <span class="nav-text">{{m.text}}</span>
          </a>
        </ng-template>

      </ng-container>
    </mat-accordion>
  `,
  styles: [`.nav-text {
    font-size: 0.9em;
    margin-left: 4px;
  }`]
})
export class SidenavMenuComponent {
  @Input() menus: SidenavMenu[] = [];

  get hasMenus(): boolean {
    return this.menus && this.menus.length > 0;
  }
}
