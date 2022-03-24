# ngLibs

personal angularX library.

# how to use

`depends on 'my-tsbase'. CommonJS or AMD dependencies can cause optimization bailouts.`, add code in angular.json

```
# your project's build options

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

# 版本依赖

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

全部保持版本一致，更新顺序 `ngxbase -> ngxupload -> ngxeditor -> ngxmaz -> ngxapp`
