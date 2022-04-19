import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {AlterService} from "@fsl/ngxbase";

import {UploadResultBody, UploadResultQiniuBody, UploadSrcData} from "../model";

import {MyNgxUploadConfig, UploadFileConfig} from "../config";
import {FileActionService} from "../service/file-action.service";
import {UploadEngine} from "../service/engine";



@Component({
  selector: 'lib-upload-trigger',
  template: `<input *ngIf="fileConf.multiple; else one"
                    style="visibility: hidden;width: 0;" type="file" multiple="multiple"
                    [id]="name"
                    (change)="change($event)"
                    [accept]="fileConf.allowTypes">
  <ng-template #one>
    <input style="visibility: hidden;width: 0;" type="file"
           [id]="name"
           (change)="change($event)"
           [accept]="fileConf.allowTypes">
  </ng-template>
  `
})
/**
 使用示例
 <lib-trigger-upload [trigger]="showWindow" (action)="onSrcChange($event)">
 </lib-trigger-upload>
 */
export class LibUploadTriggerComponent implements OnInit {
  show = false;
  /**
   * 上传图片改变
   */
  @Output() action = new EventEmitter<UploadSrcData>();
  /**
   * 上传进度
   */
  @Output() percent = new EventEmitter<number>();

  /**
   * input id name
   */
  @Input() name = 'file';

  /**
   * 触发上传事件
   */
  @Input()
  set trigger(yes: boolean) {
    if (yes !== this.show) {
      this.show = yes;
      const e: HTMLElement = document.getElementById(this.name) as HTMLElement;
      e.click();
    }
  }

  private readonly actSer: FileActionService;

  constructor(
    public fileConf: UploadFileConfig,
    private engine: UploadEngine,
    private conf: MyNgxUploadConfig,
    private alterSer: AlterService,
  ) {
    this.actSer = new FileActionService(fileConf);
  }

  ngOnInit() {
    this.engine.onInit();
  }

  // 选择了文件
  change(event: Event) {
    event.stopPropagation();
    this.actSer.clear();
    if (this.actSer.change(event, msg => {
      this.alterSer.danger(msg);
    })) {
      for (let i = 0; i < this.actSer.queue.length; i++) {
        const f = this.actSer.fileAt(i);
        if (f) {
          // 上传文件
          this.engine.upload(f, {
            failed: err => {
              console.error('upload failed:', err);
              this.alterSer.danger(err);
            },
            success: (res: UploadResultBody | UploadResultQiniuBody | any) => {
              // console.log('upload success:', res.url);
              this.action.emit({
                data: '',
                key: '',
                src: res.url || res.filename,
                type: f.type,
              });
            },
            process: (percent: number, loaded: number, total: number) => {
              this.percent.emit(percent);
            }
          }, {name: this.name});
        }
      }
    } else {
      console.log('upload valid failed');
    }
  }
}
