import {Component} from "@angular/core";
import {AllowFileType, MyNgxUploadConfig, UploadEngine, UploadFileConfig} from "@fsl/ngxupload";
import {FileUploadService} from "@fsl/ngxapp";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MyFormData} from "@fsl/ngxbase";

@Component({
  template: `<h3>服务器文件上传</h3>
  <lib-upload-one text="文件选择" (action)="rst = $event" idName="file"></lib-upload-one>

  <div class="py10">上传结果:{{rst|json}}</div>

  <h3>文件选择上传</h3>
  <form class="lib-form" (ngSubmit)="onSubmit()">
      <lib-form-input label="Name" class="width150" [form]="mo" name="name"></lib-form-input>
      <lib-upload-select (files)="files = $event"></lib-upload-select>
      <lib-back-submit [disabled]="mo.invalid"></lib-back-submit>
  </form>
  `,
  providers: [
    {provide: UploadFileConfig, useValue: {allowTypes: AllowFileType}},
    {provide: UploadEngine, useClass: FileUploadService},
  ]
})
export class DemoServerUploadComponent {
  rst: any;

  files = new Array<File>()

  mo = this.fb.group({
    name: '',
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private config: MyNgxUploadConfig,
  ) {
  }

  onSubmit() {
    const fd = new FormData();
    this.files.forEach(f => {
      fd.set('file', f, f.name)
    })
    MyFormData.convertJson2FormData(this.mo.value, '', fd)
    this.http.post(this.config.serverUploadUrl, fd).subscribe(rst => {
      this.rst = rst;
    })
  }
}
