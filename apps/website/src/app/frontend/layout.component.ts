import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {LayoutService, MenuService} from "@fsl/ngxmaz";
import {
  MyAppxRouteConfig,
  RoleAdmin, RoleService
} from "@fsl/ngxapp";

import {navigateBy} from "@fsl/ngxbase";

@Component({
  template: `
    <lib-layout home="首页" color="primary">
      <ng-container name="left">
        左侧菜单
      </ng-container>
      <ng-container name="right">
        右侧菜单
      </ng-container>
      <ng-container name="toolbar">

        <a mat-button routerLink="/user">后台</a>

        <lib-signer (roles)="bindRolesChange()"></lib-signer>

        <a mat-button (click)="layoutSer.rightToggle()">右侧</a>
      </ng-container>

      <router-outlet></router-outlet>

      <ng-container name="footer">
        <div>底部边栏</div>
      </ng-container>
    </lib-layout>
  `
})
export class LayoutComponent implements OnInit {

  isAdmin = false;

  constructor(public layoutSer: LayoutService,
              public routeConfig: MyAppxRouteConfig,
              public menuSer: MenuService,
              public router: Router,
  ) {
  }

  ngOnInit() {
    this.layoutSer.assign({useLeft: true, useRight: true})
    this.menuSer.subscribe();
  }

  toHome() {
    this.menuSer.clear();
    navigateBy(this.router, this.routeConfig.home);
  }

  bindRolesChange() {
    this.isAdmin = RoleService.inRoles(RoleAdmin);
  }
}
