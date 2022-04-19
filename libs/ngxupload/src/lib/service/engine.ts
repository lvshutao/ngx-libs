import {Observable} from "rxjs";
import {UploadResultBody, UploadResultQiniuBody} from "../model";
import {Injectable} from "@angular/core";

export interface UploadCallback {
  process?: (percent: number, loaded: number, total: number) => void;
  failed: (err: any) => void;
  success: (res: UploadResultBody | UploadResultQiniuBody | any) => void;
  preview?: (res: UploadResultBody | UploadResultQiniuBody | any) => void;
}

@Injectable({providedIn: 'root'})
export class UploadEngine {

  constructor() {
    console.warn('不能直接调用 UploadEngine, 请使用 QiniuEngine 或 自己实现 ServerEngine')
  }

  onInit(): void {
    console.warn('不能直接调用 UploadEngine onInit')
  }

  /**
   * 文件上传
   * @param file {File}
   * @param action {UploadCallback} 上传回调
   * @param conf {Object} 其它配置信息
   */
  upload(file: File, action: UploadCallback, conf: any): Observable<any> | null {
    console.warn('不能直接调用 UploadEngine upload')
    return null
  }
}

