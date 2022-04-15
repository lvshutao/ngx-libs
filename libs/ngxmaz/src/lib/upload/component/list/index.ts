import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {MySecret} from "my-tsbase";
import {FileQueueService, UploadResult, UploadResultQiniuBody} from "@fsl/ngxupload";

import {LibSnackService} from "../../../../index";

@Component({
  selector: 'lib-uploadmaz-list',
  templateUrl: 'index.html',
})
export class LibUploadMazFileListComponent implements OnInit {
  /**
   * 多文件上传
   */
  @Input() multiple = true;
  /**
   * 是否显示预览
   */
  @Input() preview = true;
  /**
   * 是否自动上传
   */
  @Input() autoUpload = false;
  /**
   * 是否隐藏上传按钮
   */
  @Input() hideBtn = false;
  /**
   * 默认的 id
   */
  @Input() idName = MySecret.randomString(6);
  /**
   * 是否使用七牛上传
   */
  @Input() useQiniu = true; // 是否使用七牛上传
  /**
   * 上传成功，参数示例
   * {
   *     "url": "http://assets.emm365.com/Fnrb49gFZVhV0jZ-QsoywQh0bUel",
   *     "scope": "fsl-media",
   *     "key": "Fnrb49gFZVhV0jZ-QsoywQh0bUel"
   * }
   */
  @Output() whenUpload = new EventEmitter<UploadResultQiniuBody | any>();
  /**
   * 移除成功, index
   */
  @Output() whenRemove = new EventEmitter<number>();
  /**
   * 全部完成上传, boolean
   */
  @Output() whenFinish = new EventEmitter<boolean>();

  public readonly htmlSer = new FileQueueService();
  public toUpload = false; // 开始全部上传
  public toCancel = false; // 取消全部上传

  constructor(private showSer: LibSnackService) {
  }

  ngOnInit(): void {
    this.htmlSer.multiple = this.multiple;
  }

  // 选择了图片
  change(event: Event) {
    event.stopPropagation();
    if (this.htmlSer.change(event, msg => {
      this.showSer.danger(msg);
    })) {
      if (this.autoUpload) {
        this.toUpload = true;
      }
    }
  }

  // 移出队列
  remove(index: number) {
    this.htmlSer.removeAt(index);
    this.whenRemove.emit(index);
    this.finishEvent();
  }

  // 上传成功回调
  update(data: UploadResult) {
    console.log('成功回调:', data);
    this.whenUpload.emit(data.body); // 通常返回 name 和 url
    this.htmlSer.uploadSuccess(data.index);
    this.finishEvent();
  }

  private finishEvent() {
    this.whenFinish.emit(this.htmlSer.complete);
  }
}
