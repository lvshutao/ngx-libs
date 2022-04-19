import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import * as qiniu from 'qiniu-js';
import {AlterService} from "@fsl/ngxbase";

import {UploadCallback, UploadEngine} from "./engine";
import {MyNgxUploadConfig} from "../config";

interface QiniuCert {
  token: string; // token
  expire: number; // 有效时间戳
  domain: string;
  scope: string;
}

export interface QiniuUploadResult {
  hash: string;
  key: string;
}


// https://developer.qiniu.com/kodo/sdk/1283/javascript
// https://github.com/qiniu/js-sdk/blob/master/test/demo2/index.js
// 七牛上传服务：1. 上传凭证获取；2. 上传文件
// 防止放置多个上传组件时，重复请求
let _isRequest = false;
const cacheKey = '_uploadKey'


@Injectable()
/**
 * 七牛上传
 */
export class QiniuEngine implements UploadEngine {
  // 缓存数据
  private qcCache: QiniuCert = {token: '', expire: 0, domain: '', scope: ''};

  private uploadPutExtra = {
    fnName: '',
    params: {},
    // mimeType: ['image/*'], // 只允许上传图片类型
  };

  private uploadConfig = {
    useCdnDomain: false, // 是否
    disableStatisticsReport: false,
    region: qiniu.region.z2
  };

  constructor(private conf: MyNgxUploadConfig,
              private alter: AlterService,
              private http: HttpClient) {
    this.reload();
  }

  private reload() {
    const qc = localStorage.getItem(cacheKey);
    if (qc && qc.length > 10) {
      this.qcCache = JSON.parse(qc) as QiniuCert;
    } else {
      this.qcCache = {token: '', expire: 0, domain: '', scope: ''};
    }
  }

  onInit() {
    return this.loadToken();
  }


  private loadToken() {
    if (this.conf.qiniuTokenUrl == '') {
      this.alter.danger('配置错误: qiniuTokenUrl is empty');
      return;
    }
    if (this.tokenExpires()) {
      if (!_isRequest) {
        _isRequest = true;
        if (this.conf.debug) {
          console.log('开始刷新上传 token');
        }
        this.http.get<QiniuCert>(this.conf.qiniuTokenUrl).subscribe(res => {
          this.qcCache = res;
          localStorage.setItem(cacheKey, JSON.stringify(res));
        }).add(() => {
          _isRequest = false;
        });
      }
    } else {
      // console.log('qiniu token is active...');
    }
    return '';
  }

  // 检查当前缓存的 token 是否过期
  private tokenExpires(): boolean {
    const now = new Date().getTime() / 1000;
    return this.qcCache.expire - now < 3600;
  }

  /**
   * 上传结果
   * @param file {File} 上传文件
   * @param conf {Object} 其它配置信息
   * @example
   upload(file).subscribe(
   (res: any) => { console.log('上传进度:', res); },
   (err: any) => { },
   (res: QiniuUploadResult) => {
        // 上传结果
   })
   */
  upload(file: File, action: UploadCallback, conf: any = {}): null {
    /**
     * @param file Blob 对象，上传的文件；如果文件md5一样，那么在七牛云只会保存一份，同样的文件名
     * @param key 文件资源名
     * @param token 上传验证信息，前端通过接口请求后端获得
     * @param putExtra 额外数据 {fname:'文件原文件名', params:{自定义变量}, mimeType:["image/jpeg","image/png", 其它文件]}
     * @param config 配置信息
     */
    let token = this.qcCache.token;
    if (!token) {
      this.reload();
    }
    token = this.qcCache.token;

    // @ts-ignore
    return qiniu.upload(file, null, token, this.uploadPutExtra, this.uploadConfig).subscribe(
      (res: any) => {
        // console.log('next:', res); // total: {loaded: 42973, size: 42973, percent: 100}
        if (action.process) {
          action.process(res.total.percent, res.total.loaded, res.total.size);
        }
      },
      (err: any) => action.failed(err),
      // @ts-ignore
      (res: QiniuUploadResult) => {
        // 预览地址 http://media.emm365.com/FgHnqMq9XQvxgy9dvACoXrYu0cF0 前面的域名不是返回的
        // 如果没有设置文件名，那么 hash 和 key 都是一样的
        // FgHnqMq9XQvxgy9dvACoXrYu0cF0

        action.success({
          url: this.qcCache.domain + '/' + res.key,
          scope: this.qcCache.scope,
          key: res.key,
        });
      }
    );
  }
}
