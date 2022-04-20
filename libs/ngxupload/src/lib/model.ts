export interface UploadResult {
  index: number;
  server?: string; // qiniu 或者 local
  body: UploadResultBody | UploadResultQiniuBody | any;
}

export interface UploadResultBody {
  name: string; // 原始文件名
  url: string; // 访问地址
  filename: string; // 服务器保存的文件名
}

// 防止修改域名后导致后台图片地址全都崩溃
export interface UploadResultQiniuBody {
  url: string;
  key: string;
  scope: string;
}

export interface UploadSrcData {
  data: string; // 本地图片数据
  key: string; // md5 用于防止重复
  src: string; // 实际访问地址
  type: string;
}

export const ImageType = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif'
];
export const AllowImageType = ImageType.join(';');
export const FileType = [
  'text/plain','text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf'
];
export const FileTypeXlsx = '.xlsx';
export const AllowFileType = AllowImageType + FileType.join(';');

export function isImageType(type: string): boolean {
  return type.indexOf('image') > -1;
}
