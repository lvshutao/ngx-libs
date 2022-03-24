import {MatPaginatorIntl} from '@angular/material/paginator';

const paginatorCnLabel = (page: number, pageSize: number, length: number) => {
  if (length < 1) {
    return '没有记录';
  }
  if (pageSize < 1) {
    return `分页配置错误`;
  }

  length = Math.max(length, 0);
  const totalPage = Math.ceil(length / pageSize);
  return `第 ${page + 1}/${totalPage} 页； ${length} 条记录`;

  // const startIndex = page * pageSize;
  // const endIndex = startIndex < length ?
  //   Math.min(startIndex + pageSize, length)
  //   : startIndex + pageSize;
  // return `当前第 ${startIndex + 1} - ${endIndex} ，共 ${length} 条记录`;
};

/**
 * 分页语言
 */
export function myNgxMazPaginatorIntlCN() {
  const pl = new MatPaginatorIntl();
  pl.firstPageLabel = '首页';
  pl.lastPageLabel = '尾页';
  pl.itemsPerPageLabel = '每页显示记录数';
  pl.nextPageLabel = '下一页';
  pl.previousPageLabel = '上一页';
  pl.getRangeLabel = paginatorCnLabel;
  return pl;
}

/*
providers: [
  {provide: MatPaginatorIntl, useValue: myNgxMazPaginatorIntlCN()}
],
 */
