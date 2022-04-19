import {Injectable} from "@angular/core";
import {AllowImageType} from "./model";

@Injectable({providedIn: 'root'})
/**
 * 上传配置
 */
export class MyNgxUploadConfig {
  qiniuTokenUrl = ''; // 获取七牛上传 token， env.qiniuTokenUrl
  serverUploadUrl = ''; // 普通文件上传地址
  debug = false; // 打印测试信息
}


/**
 * 上传文件配置信息
 */
@Injectable({providedIn: "root"})
export class UploadFileConfig {
  allowTypes = AllowImageType;
  multiple = false;
}

export function setUploadFileConfig(c: any) {
  return {
    allowTypes: c['allowTypes'] || AllowImageType,
    multiple: c['multiple'] || false,
  }
}
