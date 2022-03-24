import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {UploadResultBody, UploadResultQiniuBody} from "../model";
import {MyNgxUploadConfig} from "../config";
import {ServerEngine} from "./server.engine";
import {QiniuEngine} from "./qiniu.engine";



export interface UploadCallback {
  process?: (percent: number, loaded: number, total: number) => void;
  failed: (err: any) => void;
  success: (res: UploadResultBody | UploadResultQiniuBody | any) => void;
  preview?: (res: UploadResultBody | UploadResultQiniuBody | any) => void;
}

export interface UploadEngine {
  /**
   * 初始化
   * @param alert
   */
  onInit(alert: (message: string) => void): void;

  // 获取配置信息
  config(): any;

  // 文件上传
  upload(file: File, name: string, alert: (message: string) => void): Observable<any> | null;
}


export function NewUploadEngine(conf: MyNgxUploadConfig, http: HttpClient): UploadEngine {
  if (conf.isQiniu) {

    return new QiniuEngine(conf, http);
  } else {
    return new ServerEngine(conf, http);
  }
}

