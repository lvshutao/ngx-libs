import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
/**
 * 上传配置
 */
export class MyNgxUploadConfig {
  isQiniu = true;
  qiniuTokenUrl = ''; // 获取七牛上传 token， env.qiniuTokenUrl
  serverUploadUrl = ''; // 普通文件上传地址
  debug = false;
}
