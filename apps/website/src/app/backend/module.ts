import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {MenuService, MyNgxMazLayoutModule, SidenavMenu} from "@fsl/ngxmaz";
import {MyNgxAppModule} from "@fsl/ngxapp";

import {LayoutComponent} from "./layout.component";
import {HomeComponent} from "./home.component";


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: HomeComponent},
        ], data: {title: '会员管理中心'}
      }
    ]),
    MyNgxMazLayoutModule,
    MyNgxAppModule
  ]
})
export class BackendModule {
  constructor(private menuSer: MenuService) {
    const menus: SidenavMenu[] = [
      {
        text: '菜单1', expanded: true, route: '/user/menu1/', children: [
          {text: '子菜单1', route: 'menu1'},
          {text: '子菜单2', route: 'menu2'},
          {text: '子菜单3', route: 'menu3'},
        ]
      },
      {
        text: '菜单2', expanded: true, route: '/user/menu2/', children: [
          {text: '子菜单1', route: 'menu1'},
          {text: '子菜单2', route: 'menu2'},
          {text: '子菜单3', route: 'menu3'},
        ]
      }
    ]
    this.menuSer.addMenus('user', menus);
  }
}
