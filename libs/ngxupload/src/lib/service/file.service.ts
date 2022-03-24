import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";

import {NewUploadEngine, UploadCallback, UploadEngine} from "./engine";
import {MyNgxUploadConfig} from "../config";

export class FileService {
  private readonly engine: UploadEngine;

  constructor(private conf: MyNgxUploadConfig, private http: HttpClient,
              public filedName = 'file') {
    if (conf.debug) {
      console.log('FileService.uploadConf:', conf);
    }
    this.engine = NewUploadEngine(conf, http);
  }

  onInit(alert: (message: string) => void) {
    return this.engine.onInit(alert);
  }

  // 获取文件的本地地址，通常用于预览
  getLocalURL(file: File, src: (url: string) => void) {
    const reader = new FileReader();
    reader.onload = (e: any) => src(e.target.result);
    reader.readAsDataURL(file);
  }

  upload(file: File, func: UploadCallback) {
    if (this.conf.isQiniu) {
      // console.log('七牛上传');
      return this.qiniuUpload(file, func);
    } else {
      // console.log('服务器上传');
      return this.serveUpload(file, func);
    }
  }

  qiniuUpload(file: File, func: UploadCallback) {
    return this.engine.upload(file, this.filedName, func.failed)?.subscribe(
      (res: any) => {
        // console.log('next:', res); // total: {loaded: 42973, size: 42973, percent: 100}
        if (func.process) {
          func.process(res.total.percent, res.total.loaded, res.total.size);
        }
      },
      (err: any) => func.failed(err),
      // @ts-ignore
      (res: QiniuUploadResult) => {
        // 预览地址 http://media.emm365.com/FgHnqMq9XQvxgy9dvACoXrYu0cF0 前面的域名不是返回的
        // 如果没有设置文件名，那么 hash 和 key 都是一样的
        // FgHnqMq9XQvxgy9dvACoXrYu0cF0
        const qn = this.engine.config();
        func.success({
          url: qn.domain + '/' + res.key,
          scope: qn.scope,
          key: res.key,
        });
      });
  }

  serveUpload(file: File, func: UploadCallback) {
    return this.engine.upload(file, this.filedName, func.failed)?.subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (func.process) {
          func.process(Math.floor(event.loaded * 100 / event.total), event.loaded, event.total);
        }
      }
      const eName = event.constructor.name;
      if (event.status === 200 && 'HttpResponse' === eName) { // 上传成功
        func.success(event.body);
      }
    }, (err: HttpErrorResponse) => func.failed(err.error));
  }
}
