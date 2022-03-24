import {HttpClient, HttpHeaders} from "@angular/common/http";

import {MyNgxUploadConfig} from "../config";
import {UploadEngine} from "./engine";

// 全局
export class NgxUploadService {
  static data: object;

  /**
   * @param {{file:File}} 上传的文件
   * @return {string}
   */
  static invalid: any;
}


export class ServerEngine implements UploadEngine {
  constructor(
    private readonly conf: MyNgxUploadConfig,
    private readonly http: HttpClient,
  ) {
  }

  onInit(alert: (message: string) => void) {
    if (this.conf.serverUploadUrl == '') {
      alert('上传地址为空');
    }
    if (this.conf.serverUploadUrl.indexOf('http') != 0) {
      alert('上传地址不是 http 开头');
    }
  }

  config(): any {
    return null;
  }


  upload(file: File, name: string, alert: (message: string) => void) {

    if (this.conf.serverUploadUrl == '') {
      alert('上传地址为空');
      return null;
    }
    if (this.conf.serverUploadUrl.indexOf('http') != 0) {
      alert('上传地址不是 http 开头');
      return null;
    }
    if (name == '') {
      alert('表单 file name 为空');
      return null;
    }

    const formData = new FormData();
    formData.set(name || 'file', file, file.name);
    if (NgxUploadService.data) {
      for (const key in NgxUploadService.data) {
        if (NgxUploadService.data.hasOwnProperty(key)) {
          // @ts-ignore
          formData.set(key, NgxUploadService.data[key]);
        }
      }
    }
    return this.http.post(this.conf.serverUploadUrl, formData, {
      headers: new HttpHeaders(),
      observe: 'events',
      // params: NgxUploadService.data ,
      reportProgress: true,
      responseType: 'json',
      withCredentials: true,
    });
  }
}
