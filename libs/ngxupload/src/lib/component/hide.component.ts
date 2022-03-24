import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {AlterService} from "@fsl/ngxbase";

import {FileHtmlService} from "../service/file-html.service";
import {AllowImageType} from "../model";
import {MyNgxUploadConfig} from "../config";

@Component({
  selector: 'lib-upload-hide',
  template: `
    <div style="display: none;">
      <input *ngIf="isMultiple; else single" [id]="idName" multiple="multiple" type="file" style="visibility: hidden;"
             (change)="change($event)" [accept]="allowTypes">
      <ng-template #single>
        <input [id]="idName" type="file" style="visibility: hidden;"
               (change)="change($event)" [accept]="allowTypes">
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
  isMultiple = true;
  allowTypes = AllowImageType;

  @Input()
  set multiple(yes: boolean) {
    this.isMultiple = yes;
    this.fileHtml.queueSer.multiple = yes;
  }

  private readonly fileHtml: FileHtmlService;

  @Input() idName = 'file';

  @Input()
  set allowType(types: string) {
    this.allowTypes = types;
    this.fileHtml.queueSer.allowType = types;
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() action = new EventEmitter<string>();

  constructor(private conf: MyNgxUploadConfig,
              private http: HttpClient,
              private alterSer: AlterService) {
    this.fileHtml = new FileHtmlService(conf, http);
    this.fileHtml.queueSer.allowType = this.allowTypes;
  }

  ngOnInit(): void {
    this.fileHtml.onInit(msg => {
      this.alterSer.danger(msg);
    });
  }

  // 选择了图片
  // 选择同样的文件将无法触发上传
  change(event: Event) {
    console.log('file change:', (event.target as HTMLInputElement).files?.length);

    this.fileHtml.change(event, {
      success: res => {
        const rst = handleUploadResult(res);
        if (rst.ok) {
          this.action.emit(rst.src);
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

function handleUploadResult(rst: any) {
  switch (typeof rst) {
    case 'string':
      return {ok: true, src: rst};
    case 'object':
      return {ok: true, src: rst.url || rst.src || ''};
    default:
      console.warn('未知的上传结果:', rst);
      return {ok: false, src: ''};
  }
}
