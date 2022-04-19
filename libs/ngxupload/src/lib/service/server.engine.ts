import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {Observable} from "rxjs";

import {AlterService} from "@fsl/ngxbase";

import {MyNgxUploadConfig} from "../config";
import {UploadCallback} from "./engine";

/**
 * 服务器上传，通常用于继承
 * @example
 * @Injectable()
 * export class FileUploadService {
 *
 *   private engine: ServerEngine;
 *
 *   constructor(private conf: MyNgxUploadConfig, private alter: LibSnackService,
 *               private http: AppHttpService) {
 *     this.engine = new ServerEngine(conf, alter);
 *   }
 *
 *   upload(file: File, action: UploadCallback, conf: any = {}) {
 *     return this.engine.uploadWith(file, action, conf, (url: string, data: FormData) => {
 *       return this.http.post(url, data);
 *     })
 *   }
 *
 *   onInit() {
 *   }
 * }
 */
export class ServerEngine {
  constructor(
    protected conf: MyNgxUploadConfig,
    protected alter: AlterService,
  ) {
  }

  onInit() {
    if (this.conf.serverUploadUrl == '') {
      this.alter.danger('上传地址为空');
    }
    if (this.conf.serverUploadUrl.indexOf('http') != 0) {
      this.alter.danger('上传地址不是 http 开头');
    }
  }

  /**
   *
   * @param file {File} 文件
   * @param conf {Object} 其它配置信息
   * @param post {Function} 用于自定义 header 等信息
   */
  uploadWith(file: File, action: UploadCallback, conf = {name: 'file'}, post: (url: string, data: FormData) => Observable<any> | null) {

    if (this.conf.serverUploadUrl == '') {
      this.alter.danger('上传地址为空');
      return null;
    }
    if (this.conf.serverUploadUrl.indexOf('http') != 0) {
      this.alter.danger('上传地址不是 http 开头');
      return null;
    }
    if (conf.name == '') {
      this.alter.danger('表单 file name 为空');
      return null;
    }

    const formData = new FormData();
    formData.set(conf.name || 'file', file, file.name);

    return post(this.conf.serverUploadUrl, formData)?.subscribe((event: any) => {
      action.success(event);
      // if (event.type === HttpEventType.UploadProgress) {
      //   if (action.process) {
      //     action.process(Math.floor(event.loaded * 100 / event.total), event.loaded, event.total);
      //   }
      // }
      // console.log('post server:',event)
      // const eName = event.constructor.name;
      // if (event.status === 200 && 'HttpResponse' === eName) { // 上传成功
      //   action.success(event);
      // }
    }, (err: HttpErrorResponse) => action.failed(err.error));
  }
}
