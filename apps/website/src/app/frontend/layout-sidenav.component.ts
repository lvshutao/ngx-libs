import {Component} from "@angular/core";
import {LayoutService, MenuService} from "@fsl/ngxmaz";
import {MyAppxRouteConfig, RoleAdmin, RoleService} from "@fsl/ngxapp";
import {Router} from "@angular/router";
import {navigateBy} from "@fsl/ngxbase";

@Component({
  template: `
    <lib-layout-sidenav home="首页2">
      <ng-container name="left">
        左侧菜单
      </ng-container>

      <ng-container name="toolbar">

        <lib-signer (roles)="bindRolesChange()"></lib-signer>
      </ng-container>

      <router-outlet></router-outlet>

    </lib-layout-sidenav>`
})
export class LayoutSidenavComponent {
  isAdmin = false;

  constructor(public layoutSer: LayoutService,
              public routeConfig: MyAppxRouteConfig,
              public menuSer: MenuService,
              public router: Router,
  ) {
  }

  ngOnInit() {
    this.layoutSer.assign({useLeft: true})
    this.layoutSer.leftToggle();
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
