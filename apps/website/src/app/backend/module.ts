import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {
  LayoutService,
  MenuService,
  MyNgxMazFormModule,
  MyNgxMazLayoutModule,
  MyNgxMazMapModule,
  SidenavMenu
} from "@fsl/ngxmaz";
import {MyNgxAppModule} from "@fsl/ngxapp";

import {LayoutComponent} from "./layout.component";
import {HomeComponent} from "./home.component";
import {DemoFormComponent} from "./demo/form.component";
import {DemoMapComponent} from "./demo/map.component";
import {DemoUploadComponent} from "./demo/upload.component";
import {DemoServerUploadComponent} from "./demo/server-upload.component";
import {MyNgxEditorModule} from "@fsl/ngxeditor";


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,

    DemoFormComponent,
    DemoMapComponent,
    DemoUploadComponent,
    DemoServerUploadComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: HomeComponent},
          {path: 'form', component: DemoFormComponent},
          {path: 'map', component: DemoMapComponent},
          {path: 'upload', component: DemoUploadComponent},
          {path: 'server-upload', component: DemoServerUploadComponent},
        ], data: {title: '会员管理中心'}
      }
    ]),
    MyNgxMazLayoutModule,
    MyNgxAppModule,
    MyNgxMazFormModule,
    MyNgxMazMapModule,
    MyNgxEditorModule
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
        text: '组件测试', expanded: true, route: '/user/', children: [
          {text: '表单 FORM', route: 'form'},
          {text: '地图 MAP', route: 'map'},
          {text: '七牛文件上传', route: 'upload'},
          {text: '服务器文件上传', route: 'server-upload'},
        ]
      },
      {
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
