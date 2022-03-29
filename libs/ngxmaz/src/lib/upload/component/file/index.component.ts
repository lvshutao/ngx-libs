import {Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {UploadResult, FileService, MyNgxUploadConfig} from '@fsl/ngxupload';

import {LibSnackService} from "../../../snack/snack.servic";

@Component({
  selector: 'lib-uploadmaz-file',
  templateUrl: 'index.component.html',
  styles: [`.failed {
    text-decoration: line-through;
    color: red;
  }

  .upload-img {
    width: 200px;
    height: 150px;
    overflow: hidden;
  }`]
})
export class LibMazUploadFileComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Input() file: File;
  @Input() index = -1;
  @Input() showInfo = false; // 是否显示文件名及上传进度

  @Input()
  set preview(yes: boolean) { // 使用图片预览
    if (yes && this.file.type.indexOf('image') === 0) {
      this.fileSer.getLocalURL(this.file, url => this.src = url);
    }
  }

  @Input()
  set toUpload(yes: boolean) { // 触发上传
    console.log('prepare to upload:', this.index, ';', yes);
    if (yes) {
      this.upload();
    }
  }

  @Input()
  set toCancel(yes: boolean) { // 触发取消上传
    console.log('prepare to cancel:', this.index, ';', yes);
    if (yes) {
      if (this.fileUploadSubscription) {
        this.fileUploadSubscription.unsubscribe();
      }
    }
  }

  @Output() whenRemove = new EventEmitter<number>();
  @Output() whenUpload = new EventEmitter<UploadResult>(); // 返回响应的内容

  public src = ''; // 图片地址
  public progressPercentage = 0; // 上传百分百
  public loaded = 0; // 当前已上传
  public total = 0; // 总数据量
  public isUploading = false; // 如果正在上传，则不能重复点击上传按钮
  public updateError = false; // 上传失败，则添加失败标记
  // 内部
  private fileUploadSubscription: any;
  private test = false;
  private readonly fileSer: FileService;

  constructor(
    private readonly conf: MyNgxUploadConfig,
    private readonly http: HttpClient,
    private readonly showSer: LibSnackService,
    private ngZone: NgZone,
  ) {
    this.fileSer = new FileService(this.conf, this.http);
  }

  ngOnInit() {
    this.fileSer.onInit(msg => {
      this.showSer.danger(msg);
    });
  }

  public remove(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
    this.whenRemove.emit(this.index);
  }

  // 测试
  private uploadTest(): void {
    this.isUploading = true;

    const ddd = setInterval(() => {
      this.progressPercentage += 25;
      if (this.progressPercentage >= 100) {
        this.whenUpload.emit({
          index: this.index,
          server: 'qiniu', body: {url: 'upload.test'}
        });
        this.isUploading = false;
        clearInterval(ddd);
      }
    }, 1000);
  }

  public upload(): void {
    if (this.test) {
      this.uploadTest();
      return;
    }
    this.isUploading = true;
    this.fileUploadSubscription = this.fileSer.upload(this.file, {
      process: (percent: number, loaded: number, total: number) => {
        this.ngZone.run(() => { // 异步界面刷新
          this.progressPercentage = percent;
          this.loaded = loaded;
          this.total = total;
        });
      },
      failed: (err: any) => {
        console.log('upload error:', err);
        if (this.fileUploadSubscription) {
          this.fileUploadSubscription.unsubscribe();
        }
        this.isUploading = false;
        this.updateError = true;
      },
      success: (res: any) => {
        this.ngZone.run(() => {
          this.isUploading = false;
          this.updateError = false;
        });
        this.whenUpload.emit({
          index: this.index,
          body: res
        });
        if (this.fileUploadSubscription) {
          console.log('上传完成，直接取消订阅');
          this.fileUploadSubscription.unsubscribe();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
    console.log('index ' + this.index + ':' + this.file.name + ' destroyed...');
  }
}
