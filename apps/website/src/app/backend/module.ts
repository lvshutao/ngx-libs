import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {LayoutService, MenuService, MyNgxMazLayoutModule, SidenavMenu} from "@fsl/ngxmaz";
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
  ],
  providers: [
    LayoutService,
  ]
})
export class BackendModule {
  constructor(private menuSer: MenuService, private layoutSer: LayoutService) {
    this.layoutSer.selfLeft = true;

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
      }, {
        text: '基本信息', expanded: true, route: '/user/', children: [
          {text: '我的资料', route: 'account', icon: 'account_circle'},
          {text: '收件地址', route: 'address', icon: 'place'},
        ]
      }, {
        text: '单项菜单', route: 'abc', icon: 'place',
      }

    ]
    this.menuSer.addMenus('user', menus);
  }
}
