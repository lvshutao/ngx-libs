/**
 * 获取文件的本地地址，通常用于预览
 * @param file {File} 上传文件对象
 * @param src {string} 预览地址
 */
export function getFileLocalURL(file: File, src: (url: string) => void) {
  const reader = new FileReader();
  reader.onload = (e: any) => src(e.target.result);
  reader.readAsDataURL(file);
}


export function handleUploadResult(rst: any) {
  switch (typeof rst) {
    case 'string':
      return {ok: true, src: rst};
    case 'object':
      if (rst['url'] || rst['src']) {
        return {ok: true, src: rst['url'] || rst['src']};
      } else {
        return rst; // 返回整个结果
      }
    default:
      return rst;
  }
}
