/* eslint-disable @typescript-eslint/ban-ts-comment */
import {MatTableDataSource} from "@angular/material/table";

import {ResListResult,MyTableService} from 'my-tsbase'

/**
 * @deprecated 暂时不使用
 */
export class MazTableService<T> extends MyTableService<T> {
  // @ts-ignore
  private _dataSource: MatTableDataSource<T>;
  private columns: string[] = [];
  private backupColumns: string[] = [];

  setColumns(columns: string[]) {
    this.columns = columns;
    this.backupColumns = columns;
    return this;
  }

  get displayedColumns(): string[] {
    return this.columns;
  }

  get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  // 设置表格数据
  set data(records: T[]) {
    if (records) {
      this._dataSource = new MatTableDataSource(records);
    }
  }

  columnRemove(name: string) {
    const index = this.columns.findIndex(c => c == name);
    if (index > -1) {
      this.columns.splice(index, 1);
    }
  }

  columnReset() {
    this.columns = Object.assign({}, this.backupColumns);
  }


  override itemRemove(e: T): boolean {
    return this.itemRemoveIndex(this.itemIndex(e));
  }

  itemIndex(e: T): number {
    return this._dataSource.data.indexOf(e);
  }

  itemRemoveIndex(index: number): boolean {
    if (index > -1) {
      this._dataSource.data.splice(index, 1);
      this._dataSource = new MatTableDataSource(this._dataSource.data);
      this.total -= 1;
      return true;
    } else {
      console.warn('remote item but index is wrong:', index);
    }
    return false;
  }

  itemInsert(item: T) {
    this._dataSource.data.push(item);
    this.total += 1;
    this._dataSource = new MatTableDataSource(this._dataSource.data);
  }


  itemUpdate(item: T) {
    const index = this._dataSource.data.indexOf(item);
    this.itemUpdateIndex(index, item);
  }

  itemUpdateIndex(index: number, item: T) {
    if (index > -1) {
      Object.assign(this._dataSource.data[index], item);
      this._dataSource = new MatTableDataSource(this._dataSource.data);
    } else {
      console.warn('update item, but index is wrong:', index);
    }
  }


  itemReplaceIndex(index: number, item: T) {
    if (index > -1) {
      this._dataSource.data[index] = item;
      this._dataSource = new MatTableDataSource(this._dataSource.data);
    } else {
      console.warn('replace item, but index is wrong:', index);
    }
  }

  override listResponse(res: ResListResult<T>) {
    this.isLoading = false;
    if (res) {
      this.total = res.total;
      this.data = res.rows || [];
    }
  }

  override listResponseAndAssignWhere(res: ResListResult<T>, q: any) {
    this.listResponse(res);
    this.assignWhere(q);
  }
}
