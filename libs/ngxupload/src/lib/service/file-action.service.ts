import {UploadFileConfig} from "../config";

/**
 * 文件检查
 */
export class FileActionService {
  /**
   * 待上传的文件
   */
  public queue: File[] = [];
  /**
   * 已经上传的索引
   */
  public uploadIndexes: number[] = [];

  /**
   * 同一个文件不会被添加到列表中
   * @private
   */
  private _keys: string[] = [];

  constructor(private cf: UploadFileConfig) {
  }

  /**
   * 修改了文件
   * @param event
   * @param alert {Function} 注意调用时作用域
   */
  change(event: Event, alert ?: (msg: string) => void): boolean {
    const element = (event.target as HTMLInputElement);
    const filesLen = element.files ? element.files.length : 0;
    // console.log('files length:', filesLen);
    if (filesLen > 0) { // 保存到上传队列中
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
      // console.log('queue.length:', this.queue.length, this.has)
    }

    return true;
  }

  private invalid(file: File): string {
    return this.checkFileType(file);
  }


  private checkFileType(file: File): string {
    if (this.cf.allowTypes.length < 1) { // 不需要检查
      console.warn('file allowTypes is empty.');
      return '';
    }
    const filetype = file.type.toLowerCase();
    if (filetype == '') {
      if (file.name == '') {
        return '文件名不能为空';
      }
      // 文件扩展名
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (this.cf.allowTypes.indexOf(ext) < 0) {
        console.warn('current file ext not in allowTypes:', ext)
        return '不允许上传的文件扩展名';
      }
    } else if (this.cf.allowTypes.indexOf(filetype) < 0) {
      console.warn('current filetype not in allowTypes:', filetype)
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
