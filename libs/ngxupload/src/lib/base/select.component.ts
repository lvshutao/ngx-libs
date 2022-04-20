import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AlterService} from "@fsl/ngxbase";

import {FileActionService, UploadFileConfig} from "../../index";

@Component({
  selector: 'lib-upload-select',
  template: `<input [id]="idName" type="file"
                    (change)="change($event)"
                    [accept]="fileConf.allowTypes" [multiple]="fileConf.multiple">`
})
export class LibUploadSelectComponent {
  @Input() idName = 'file';
  /**
   * 需要自己构造 FormData() 去上传
   * const formData = new FormData();
   * formData.set(conf.name || 'file', file, file.name);
   * http.post(url, formData)
   */
  @Output() files = new EventEmitter<File[]>();

  fileAction: FileActionService;

  constructor(
    public fileConf: UploadFileConfig,
    public alert: AlterService,
  ) {
    this.fileAction = new FileActionService(fileConf)
  }


  change(e: Event) {
    e.stopPropagation();
    if (!this.fileAction.change(e, (msg: string) => this.alert.danger(msg))) {
      console.error('上传队列校验失败')
      return
    }
    this.files.emit(this.fileAction.queue);
  }
}
