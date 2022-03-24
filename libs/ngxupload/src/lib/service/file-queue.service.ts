import {NgxUploadService} from "./server.engine";

// 上传队列
export class FileQueueService {
  // 待上传的文件
  public queue: File[] = [];
  // 已经上传的索引
  public uploadIndexes: number[] = [];
  public multiple = false;
  public allowType = ''; // 允许的类型，比如 image/png
  private _keys: string[] = []; // 同一个文件不会被添加到列表中

  // 修改了文件
  change(event: Event, alert ?: (msg: string) => void): boolean {
    const element = (event.target as HTMLInputElement);
    const filesLen = element.files ? element.files.length : 0;
    console.log('files length:', filesLen);
    if (filesLen > 0) { // 保存到上传队列中
      // if (this.multiple) { // 多文件处理
      for (let i = 0; i < filesLen; i++) {
        // @ts-ignore
        const file = element.files[i];
        const msg = this.invalid(file);
        if (msg === '') {
          this.queue.push(file);
        } else {
          if (alert) {
            alert(msg);
          }
          return false;
        }
      }
      // } else { // 单文件
      //   const file = element.files[0];
      //   const msg = this.invalid(file);
      //   if (msg === '') {
      //     this.queue = [file];
      //   } else {
      //     if (show) {
      //       show(msg);
      //     }
      //     return false;
      //   }
      // }
      // lastModified, lastModifiedDate, name:'bdlogo.png', size:3706, type:"image/png"
    }
    // element.value = ''; // ??
    return true;
  }

  private invalid(file: File): string {
    if (NgxUploadService.invalid && typeof NgxUploadService.invalid == 'function') {
      const rst = NgxUploadService.invalid(file);
      if (rst) {
        return rst;
      }
    }
    return this.checkFileType(file);
    // if (msg === '') {
    //   const index = this._keys.indexOf(file.name);
    //   console.log('repeat check:', index);
    //   if (index < 0) {
    //     this._keys.push(file.name);
    //   } else {
    //     return '重复的文件';
    //   }
    // }
    // return msg;
  }


  private checkFileType(file: File): string {
    if (this.allowType.length < 1) { // 不需要检查
      console.warn('file allowType is empty.');
      return '';
    }
    const filetype = file.type.toLowerCase();
    if (filetype == '') {
      if (file.name == '') {
        return '文件名不能为空';
      }
      const ext = file.name.substring(file.name.lastIndexOf('.'));
      if (this.allowType.indexOf(ext) < 0) {
        return '不允许上传的文件类型';
      }
    } else if (this.allowType.indexOf(filetype) < 0) {
      return '不允许上传的文件类型';
    }

    return '';
  }

  // 移除指定位置，不想上传
  public removeAt(index: number) {
    const i = this.uploadIndexes.indexOf(index);
    this.uploadIndexes.splice(i, 1);
    console.log('removeAt:', index, 'i', i, this._keys);

    this.queue.splice(index, 1);
    // this._keys.splice(index, 1);
    console.log('剩余:', this._keys);
  }

  // 上传成功
  public uploadSuccess(index: number) {
    this.uploadIndexes.push(index); // 保存上传的索引号
  }

  public clear() {
    this.queue = [];
    this.uploadIndexes = [];
    this._keys = [];
  }

  public fileAt(index: number): File | null {
    return this.queue.length > index ? this.queue[index] : null;
  }

  // 是否有未上传
  public get has(): boolean {
    return this.queue.length > 0;
  }

  // 是否上传完成
  public get complete() {
    return this.queue.length === this.uploadIndexes.length;
  }
}
