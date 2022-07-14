import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {MyTableService, MyTextService} from "my-tsbase";
import {LibWhereService} from "./where.service";

export interface ListPageConfig<T> {
  /**
   * api 路径
   */
  path: string;
  /**
   * 默认查询条件
   */
  backupWhere: any;
  /**
   * 移除记录时的内容；默认为 "你确定要删除当前记录吗"
   */
  content?: string;
  /**
   * 编辑路径，默认为 edit
   */
  editPath?: string;
  /**
   * 编辑查询参数
   * @param o
   */
  editParams: (o: T) => Params | null,
  /**
   * 删除记录参数
   * @param o
   */
  deleteParams: (o: T) => Params | null,
  /**
   * 修改状态参数
   */
  statusParams?: (o: T) => Params | null;
}

@Component({template: ''})
export class AbstractListPageComponent<T> {

  public table = new MyTableService<T>()
  public libTextSer = MyTextService;

  /**
   * you need to overwrite this method
   * @protected
   */
  protected config(): ListPageConfig<T> {
    return {
      path: '', backupWhere: {}, editParams: (o: T) => null, deleteParams: (o: T) => null,
    }
  }

  constructor(
    protected ws: LibWhereService,
    protected route:ActivatedRoute,
  ) {
    this.table.setBackupWhere(this.config().backupWhere);
  }

  public onSearch(q: any) {
    this.ws.http.search<T>(this.config().path, q).subscribe(rst => this.table.listResponseAndAssignWhere(rst, q))
  }

  public onEdit(o: T) {
    const path = this.config().editPath || './edit';
    const p = this.config().editParams;
    this.ws.router.navigate([path], {
      relativeTo: this.route,
      queryParams: p ? p(o) : null,
    })
  }

  public onDelete(o: T) {
    this.ws.dialogSer.confirm({content: this.config().content || '你确定要移除当前记录吗？'}).subscribe(yes => {
      if (yes) {
        const q = this.config().deleteParams;
        this.ws.http.delete(this.config().path, q ? q(o) : {}).subscribe(() => {
          this.table.itemRemove(o);
          this.ws.showSer.success('移除成功');
        })
      }
    })
  }

  public onChangeStatus(o: T) {
    const q = this.config().statusParams;
    // @ts-ignore
    const status = MyTextService.nextStatus(o['status']);
    // @ts-ignore
    const p = Object.assign({status}, q(o))
    this.ws.http.changeStatusWith(this.config().path, p).subscribe(() => {
      // @ts-ignore
      o['status'] = status;
    })
  }
}
