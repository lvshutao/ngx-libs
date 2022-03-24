import {HttpClient} from "@angular/common/http";
import {MySecret} from "my-tsbase";

import {UploadCallback} from "./engine";
import {FileQueueService} from "./file-queue.service";
import {FileService} from "./file.service";
import {isImageType} from "../model";
import {MyNgxUploadConfig} from "../config";

export class FileHtmlService {

  readonly queueSer = new FileQueueService();
  readonly fileSer: FileService;
  private _keys: string[] = [];

  constructor(private conf: MyNgxUploadConfig, private http: HttpClient, private idName: string = 'file') {
    this.fileSer = new FileService(conf, http, idName);
  }

  onInit(alert: (msg: string) => void) {
    this.fileSer.onInit(alert);
  }

  // 选择了图片
  change(event: Event, func: UploadCallback) {
    event.stopPropagation();
    this.queueSer.clear();

    if (!this.queueSer.change(event, func.failed)) {
      console.log('上传队列校验失败');
      return;
    }
    if (this.conf.debug) {
      console.log('上传队列校验成功，准备上传');
    }

    for (let i = 0; i < this.queueSer.queue.length; i++) {
      const f = this.queueSer.fileAt(i);
      if (f) {
        this.fileSer.getLocalURL(f, data => {
          const s = MySecret.md5(data)
          if (this._keys.indexOf(s) < 0) {
            // 预览选中，只有图片或文件才需要
            if (isImageType(this.queueSer.allowType) && func.preview) {
              func.preview({data, src: '', key: s, type: f.type,});
            }
            this._keys.push(s);
            // 上传文件
            this.fileSer.upload(f, func);
          }
        });
      }
    }
  }
}
