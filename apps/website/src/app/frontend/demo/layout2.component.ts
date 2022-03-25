import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {LayoutService, MenuService} from "@fsl/ngxmaz";
import {MyAppxRouteConfig} from "@fsl/ngxapp";

import {navigateBy} from "@fsl/ngxbase";

@Component({
  template: `
    <lib-layout home="首页" color="primary">
      <ng-container name="left">
        左侧菜单
      </ng-container>

      <div>
        <fsl-checks></fsl-checks>
        <div>短内容</div>
      </div>

      <ng-container name="footer">
        <div>底部边栏</div>
      </ng-container>
    </lib-layout>
  `,
  styles: [`
    :host ::ng-deep .lib-layout mat-drawer-content.drawer-outlet1 {
      height: 100vh;
    }`]
})
export class Layout2Component implements OnInit {

  constructor(public layoutSer: LayoutService,
              public routeConfig: MyAppxRouteConfig,
              public menuSer: MenuService,
              public router: Router,
  ) {
  }

  ngOnInit() {
    this.layoutSer.assign({useLeft: true})
    this.menuSer.subscribe();
  }

  toHome() {
    this.menuSer.clear();
    navigateBy(this.router, this.routeConfig.home);
  }
}
