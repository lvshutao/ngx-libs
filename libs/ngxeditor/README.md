# MyNgxEditorModule

tinymce 编辑器，其中图片功能需要配合 `MyNgxUploadModule` 使用

## 使用步骤

1. 在 `app.module.ts` 中添加上传配置

```
{
  provide: MyNgxUploadConfig, useValue: {
    qiniu: env.qiniu, // true
    name: 'qiniu',
    qiniuTokenUrl: env.qiniuTokenUrl, // https://api.fushuilu.com/api/upload/cert
  },
  imports:[
    MyNgxUploadModule,
    MyNgxEditorModule,
  ]
}
```

2. 在 `angular.json` 中为 tinymce 添加 `js/css`

如果没有使用到编辑器，就不要添加以下内容

```json
{
    "scripts": [
      "node_modules/tinymce/tinymce.min.js",
      "my-ngxeditor/src/assets/zh_CN.js"
    ],
    "assets": [
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
    ]
}
```
