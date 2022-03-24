import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AlterService } from "@fsl/ngxbase";

import { AllowFileType, AllowImageType, UploadResultBody, UploadResultQiniuBody, UploadSrcData } from "../model";
import { FileService } from "../service/file.service";
import { MyNgxUploadConfig } from "../config";
import { FileQueueService } from "../service/file-queue.service";


@Component({
  selector: 'lib-upload-trigger',
  template: `<input *ngIf="multiple; else one"
                    style="visibility: hidden;width: 0;" type="file" multiple="multiple"
                    [id]="name"
                    (change)="change($event)"
                    [accept]="allowType">
  <ng-template #one>
    <input style="visibility: hidden;width: 0;" type="file"
           [id]="name"
           (change)="change($event)"
           [accept]="allowType">
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
   * 允许上传的文件类型，默认 jpg,jpeg,png,gif
   */
  @Input() allowType = AllowImageType;
  /**
   * 是否允许多选
   */
  @Input() multiple = false;
  /**
   * input id name
   */
  @Input() name = 'file';

  @Input()
  /**
   * 是否允许上传文件，如果是，则支持 pdf, txt, office 文件
   */
  set file(yes: boolean) {
    this.allowType = yes ? AllowFileType : AllowImageType;
  }

  @Input()
  /**
   * 触发上传事件
   */
  set trigger(yes: any) {
    if (yes !== this.show) {
      this.show = yes;
      const e: HTMLElement = document.getElementById(this.name) as HTMLElement;
      e.click();
    }
  }

  private readonly htmlSer = new FileQueueService();
  private readonly fileSer: FileService;

  constructor(private conf: MyNgxUploadConfig,
    private http: HttpClient,
    private alterSer: AlterService) {
    this.fileSer = new FileService(conf, http, this.name);
  }

  ngOnInit() {
    this.htmlSer.allowType = this.allowType;
    this.htmlSer.multiple = this.multiple;
    this.fileSer.filedName = this.name;
    this.fileSer.onInit(msg => {
      this.alterSer.danger(msg);
    });
  }

  // 选择了文件
  change(event: Event) {
    event.stopPropagation();
    this.htmlSer.clear();
    if (this.htmlSer.change(event, msg => {
      this.alterSer.danger(msg);
    })) {
      for (let i = 0; i < this.htmlSer.queue.length; i++) {
        const f = this.htmlSer.fileAt(i);
        if (f) {
          // 上传文件
          this.fileSer.upload(f, {
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
          });
        }
      }
    } else {
      console.log('upload valid failed');
    }
  }
}
