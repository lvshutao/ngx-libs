# MyNgxEditorModule

tinymce 编辑器，其中图片功能需要配合 `MyNgxUploadModule` 使用

## 使用步骤

1. 在 `app.module.ts` 中添加上传配置

```
{
  provide: MyNgxUploadConfig, useValue: {
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

添加 `assets/tinymce.css`

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "node_modules/tinymce",
      "output": "/tinymce/"
    }
  ],
  "scripts": [
    "node_modules/tinymce/tinymce.min.js",
    "node_modules/@fsl/ngxeditor/src/assets/zh_CN.js"
  ]
}
```
