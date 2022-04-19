/* eslint-disable @typescript-eslint/ban-ts-comment */
import {UploadEngine} from '@fsl/ngxupload';

export class TinymceService {
  readonly initEditor = {
    base_url: '/tinymce/',
    suffix: '.min',
    content_css: './assets/tinymce.css',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste imagetools wordcount'
    ],
    toolbar: `insertfile undo redo | styleselect | bold italic |
  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image`,
    language: 'zh_CN',
    forced_root_block: 'div', // 使用 div 而不是 p
    force_p_newlines: false,
    force_br_newlines: true,
    convert_newlines_to_brs: false,
    remove_linebreaks: true,
    min_height: 500,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    imagetools_cors_hosts: ['assets.emm365.com'],
    image_dimensions: true, // 移除图片的 width, height
    // image_advtab: true, // 添加样式
    // https://www.tiny.cloud/docs-4x/plugins/image/#image_class_list
    image_class_list: [ // 为图片追加样式
      {title: '宽度 MAX', value: 'full-width'},
      {title: '无', value: ''},
    ],
    // https://www.tiny.cloud/docs/plugins/opensource/image/#images_file_types
    images_file_types: 'jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF',
    // 图片处理(不支持大写的文件扩展名，如 xxx.JPG 可能上传没有反应)
    // @ts-ignore
    images_upload_handler: (blobInfo, success, failure) => {
      console.log('TinymceService.image_upload_handler running');
      // @ts-ignore
      this.engine.upload(blobInfo.blob(), {
        failed: err => {
          console.log('错误:', err);
          failure(err);
        },
        process: (percent, loaded, total) => {
          console.log('上传进度:', percent)
        },
        success: res => {
          success(res.url)
        }
      }, {})
    }
  };

  config(c: any) {
    return Object.assign(this.initEditor, c);
  }

  constructor(private readonly engine: UploadEngine) {
  }
}
