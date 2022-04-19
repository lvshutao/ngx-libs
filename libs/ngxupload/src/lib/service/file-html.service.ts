import {MySecret} from "my-tsbase";

import {UploadCallback, UploadEngine,} from "./engine";
import {FileActionService} from "./file-action.service";

import {isImageType} from "../model";
import {MyNgxUploadConfig, UploadFileConfig} from "../config";
import {getFileLocalURL} from "./function";


export class FileHtmlService {

  readonly actionSer: FileActionService;

  private _keys: string[] = [];

  /**
   * input[type=file] name
   */
  public name = 'file';

  constructor(private engine: UploadEngine, private fileConfig: UploadFileConfig, private conf: MyNgxUploadConfig) {
    this.actionSer = new FileActionService(fileConfig);
  }

  // 选择了图片
  change(event: Event, func: UploadCallback) {
    event.stopPropagation();
    this.actionSer.clear();

    if (!this.actionSer.change(event, func.failed)) {
      console.error('上传队列校验失败');
      return;
    }
    if (this.conf.debug) {
      console.log('上传队列校验成功，准备上传');
    }

    for (let i = 0; i < this.actionSer.queue.length; i++) {
      const f = this.actionSer.fileAt(i);
      if (f) {
        getFileLocalURL(f, data => {
          const s = MySecret.md5(data)
          if (this._keys.indexOf(s) < 0) {
            // 预览选中，只有图片或文件才需要
            if (isImageType(this.fileConfig.allowTypes) && func.preview) {
              func.preview({data, src: '', key: s, type: f.type,});
            }
            this._keys.push(s);
            // 上传文件
            this.engine.upload(f, func, {name: this.name});
          }
        });
      }
    }
  }
}
