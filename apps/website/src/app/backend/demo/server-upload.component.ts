import {Component} from "@angular/core";
import {AllowFileType, UploadEngine, UploadFileConfig} from "@fsl/ngxupload";
import {FileUploadService} from "@fsl/ngxapp";

@Component({
  template: `<h3>服务器文件上传</h3>
  <lib-upload-one text="文件选择" (action)="rst = $event" idName="file"></lib-upload-one>

  <div>上传结果:{{rst|json}}</div>
  `,
  providers: [
    {provide: UploadFileConfig, useValue: {allowTypes: AllowFileType}},
    {provide: UploadEngine, useClass: FileUploadService},
  ]
})
export class DemoServerUploadComponent {
  rst: any;
}
