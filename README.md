# ngLibs

personal angularX library.

### 版本依赖

使用 `/verdaccio.php` 来更新 libs

```
ngxapp
  |-- ngxbase
  |-- ngxupload
  |-- ngxmaz
ngxeditor
  |-- ngxbase
  |-- ngxupload
ngxmaz
  |-- ngxbase
  |-- ngxupload
ngxupload
  |-- ngxbase
```

更新顺序，第更新一次，都要更新一下 git

```
ngxbase 
  -> ngxupload 
      -> ngxeditor 
      -> ngxmaz -> ngxapp
```


### how to start

```
npx create-nx-workspace@latest
✔ Workspace name (e.g., org name)     · app
✔ What to create in the new workspace · angular
✔ Application name                    · website
✔ Default stylesheet format           · less
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No

直接将 `apps/website` 目录替换掉新建的项目

# angular.json, your project's build options

{
  "options":{
    "allowedCommonJsDependencies": [
        "my-tsbase"
      ],
  }
}
```

* import assets, style, script

``` 
# style.css
@import "@angular/material/prebuilt-themes/indigo-pink.css";

# angular.json
{
  "options":{
      "assets":[
          {
            "glob": "**/*",
            "input": "node_modules/tinymce/skins",
            "output": "/tinymce/skins/"
          },
          {
            "glob": "**/*",
            "input": "node_modules/tinymce/themes",
            "output": "/tinymce/themes/"
          },
          {
            "glob": "**/*",
            "input": "node_modules/tinymce/plugins",
            "output": "/tinymce/plugins/"
          }
      ],
      "styles": [
        "node_modules/@fsl/ngxbase/src/assets/preloader.css",
        "node_modules/@fsl/ngxbase/src/assets/style.css",
        "node_modules/@fsl/ngxmaz/src/assets/style.css"
      ],
      "scripts": [
        "node_modules/tinymce/tinymce.min.js",
        "node_modules/@fsl/ngxeditor/src/assets/zh_CN.js"
      ]
  }
}
```

* 如果使用布局 lib-sidenav 则可能定义侧边栏宽度

```
.lib-sidenav .sidenav1 {
  width: 200px;
}
.lib-sidenav-menus div.mat-expansion-panel-body{
  padding: 0;
}
```

* 添加开始动画


```
1. 将下面的代码添加到 index.html 中
<div id="preloader" class="preloader">
    <div class="cs-loader">
        <div class="cs-loader-inner">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="cs-loader-inner">
          <div class="logo"></div>
        </div>
        <div class="cs-loader-inner" style="margin-top: 80px;font-style: italic;">
          <div style="text-align: center;">公司名称</div>
        </div>
    </div>
</div>

2. 修改 main.ts

platformBrowserDynamic().bootstrapModule(AppModule).then(res => { // 添加这里
  console.log('Bootstrap success');
  document.getElementById('preloader').remove();
}).catch(err => console.error(err));

3. 修改 angular.json 添加
"styles": [
   "my-ngbase/src/assets/preloader.css"
],
```

