# MyNgxMaz

personal ng material base library

## how to use

```
# 配置信息
## 地图模块 MyNgxMazMapModule

export class MyNgxMazMapConfig {
  gaodeKey = '';
  debug = false;
}

```

## MyNgxMazLayoutModule

```
// app.module.ts
imports:[
  BrowserAnimationModule,
]
// app.component.html

<ng-http-loader></ng-http-loader>
<router-outlet></router-outlet>

// style.css 导入 material theme
@import "@angular/material/prebuilt-themes/indigo-pink.css";
```

## 第三方组件

* [ngx-material-timepicker](https://www.npmjs.com/package/ngx-material-timepicker)

```ts
import {NgModule} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
 
@NgModule({
  imports: [NgxMaterialTimepickerModule]
})
export class MyModule {}
```

## 其它常用组件

如果需要，可自行安装

* [ngx-loading-bar](https://github.com/aitboudad/ngx-loading-bar) 网络请求状态提示
* [ngx-toastr](https://github.com/scttcper/ngx-toastr)  信息提示
