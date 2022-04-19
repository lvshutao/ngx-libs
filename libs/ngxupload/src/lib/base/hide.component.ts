import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {AlterService} from "@fsl/ngxbase";

import {FileHtmlService} from "../service/file-html.service";

import {MyNgxUploadConfig, UploadFileConfig} from "../config";
import {UploadEngine} from "../service/engine";

import {handleUploadResult} from "../service/function";

@Component({
  selector: 'lib-upload-hide',
  template: `
    <div style="display: none;">
      <input *ngIf="fileConf.multiple; else single" [id]="idName" multiple="multiple" type="file"
             style="visibility: hidden;"
             (change)="change($event)" [accept]="fileConf.allowTypes">
      <ng-template #single>
        <input [id]="idName" type="file" style="visibility: hidden;"
               (change)="change($event)" [accept]="fileConf.allowTypes">
      </ng-template>
    </div>`
})
/**
 * 隐藏 input=file, 需要自己定义上传按钮
 * @example
 * # html code
 * <label for="{{idName}}">文件上传</label>
 * <lib-upload-hide [idName]="idName" [multiple]="false" (action)="onChange.emit($event)"></lib-upload-hide>
 */
export class LibUploadHideComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  /**
   * form input 名称
   */
  @Input() idName = 'file';


  fileHtml: FileHtmlService;

  constructor(public fileConf: UploadFileConfig,
              private engine: UploadEngine,
              private conf: MyNgxUploadConfig,
              private alterSer: AlterService) {

    this.fileHtml = new FileHtmlService(engine, fileConf, conf);
  }

  ngOnInit(): void {
    this.fileHtml.name = this.idName;
    this.engine.onInit()
  }

  // 选择了图片
  // 选择同样的文件将无法触发上传
  change(event: Event) {
    if (this.conf.debug) {
      console.log('file change:', (event.target as HTMLInputElement).files?.length);
    }

    this.fileHtml.change(event, {
      success: res => {
        const rst = handleUploadResult(res);
        if (rst.ok) {
          this.action.emit(rst.src);
        } else {
          this.action.emit(rst)
        }
      },
      failed: err => {
        this.alterSer.danger(err);
      },
      preview: res => {
        const rst = handleUploadResult(res);
        if (rst.ok) {
          this.action.emit(rst.src);
        }
      }
    });
  }
}

