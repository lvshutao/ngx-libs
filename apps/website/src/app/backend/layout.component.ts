import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {MatDrawerMode} from "@angular/material/sidenav/drawer";

import {MyBrowser} from "my-tsbase";

import {LayoutService, LibSnackService, MenuService} from "@fsl/ngxmaz";
import {MyAppxRouteConfig} from "@fsl/ngxapp";

@Component({
  template: `
    <lib-layout home="前往首页" (index)="toHome()" color="primary">
      <ng-container name="toolbar">
        <lib-signer></lib-signer>
      </ng-container>

      <lib-sidenav [mode]="mode" [display]="display">
        <ng-container name="sidenav">
          <lib-sidenav-menus [menus]="menuSer.menus"></lib-sidenav-menus>
        </ng-container>
        <div style="padding: 8px;">
          <router-outlet></router-outlet>
        </div>
      </lib-sidenav>
    </lib-layout>

  `
})
export class LayoutComponent implements OnInit {

  constructor(
    public menuSer: MenuService,
    private router: Router,
    private location: Location,
    private layoutSer: LayoutService,
    private showSer: LibSnackService,
    private routeConfig: MyAppxRouteConfig,
  ) {

  }

  ngOnInit() {
    console.log('user module');
    // if (!RoleService.inRoles(RoleSuperAdmin)) {
    //   this.showSer.danger('不是超级管理员，没有权限访问')
    //   this.location.back();
    // }
  }

  toHome() {
    this.menuSer.clear();
    this.router.navigateByUrl(this.routeConfig.home);
  }

  get mode(): MatDrawerMode {
    return MyBrowser.isMobile() ? 'over' : 'side';
  }

  get display(): boolean {
    return this.layoutSer.selfLeft && this.menuSer.hasMenus
  }
}
