/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';


import {MyAssets, MyObject, MyTableService, MyTypecast, ReqPagParam} from "my-tsbase";


@Component({
  selector: 'lib-paginator',
  template: `
    <mat-paginator *ngIf="pagLength > 0;else empty" [pageSize]="pageSize"
                   [pageIndex]="pageIndex"
                   [length]="pagLength"
                   [showFirstLastButtons]="true"
                   (page)="pageChange($event)"></mat-paginator>
    <ng-template #empty>
      <div class="center ptb10 placeholder">{{placeholder}}</div>
    </ng-template>
  `
})
/**
 * @example
 使用示例
 <lib-paginator [cond]="where"
 [reset]="pageIndex"
 [length]="total" (change)="bindSearch($event)"></lib-paginator>

 // 搜索的条件
 where = Object.assign({}, this.backupWhere);
 pageIndex = 0; // 重置的索引

 bindSubmit() {
  this.pageIndex--;
}
 bindSearchReset() {
  this.where = Object.assign({}, ...) // 重置搜索条件
  this.bindSubmit()
}
 */
export class PaginatorComponent implements OnInit {
  // @ts-ignore
  private tableSer: MyTableService<any>;

  @Input()
  set table(ser: MyTableService<any>) {
    this.tableSer = ser;
    this.tableSer.setSubmitCallback(() => {
      const data = Object.assign({}, this.pagQuery, {page: 0});
      this.navigate(MyObject.pickTrueItems(data));
    });
  }

  @Input() placeholder = '没有符合要求的记录';

  get pagLength() {
    return this.tableSer ? this.tableSer.total : this.length;
  }

  get pagQuery() {
    return this.tableSer ? this.tableSer.where : this.cond;
  }

  @Input() pageSize = 15; // 可选
  @Input() pageIndex = 0; // 可选
  @Input() length = 0; // 必须（数量）
  @Input() cond = {}; // 搜索的参数条件，需要保存到 URL 中
  @Input() keep = true; // 如果是 Dialog 页面，则需要设置为 false
  @Input() filter = true; // 是否将字符串 false/true 转为布尔类型

  hasInitEmit = false;


  @Input() // 在用户点击 "搜索" 时，会自动重置当前的分页数
  set reset(data: number) {
    if (data < 0) {
      this.pageIndex = 0;
      this.navigate(Object.assign({},
        this.tableSer ? this.tableSer.backupWhere : this.cond,
        {page: 0}));
    }
  }

  // 点击分页时事件
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<ReqPagParam | any>();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(q => {

      if (this.hasInitEmit) {
        console.log('paginator stop repeat emit');
        return;
      }
      // console.log('paginator first init');
      this.hasInitEmit = true;
      if (this.pageIndex == 0) {
        this.pageIndex = MyTypecast.str2Number(q.get('page'));
      }
      const params = MyObject.pickTrueItems(Object.assign({}, this.pagQuery, queryParamMap(q)));
      // 缓存路由 ？？
      // console.log('pag init emit:', params);
      this.change.emit(params);
    });
  }

  pageChange(page: PageEvent) {
    const params = Object.assign({}, this.pagQuery, {page: page.pageIndex});
    this.navigate(params);
  }

  private navigate(params: any) {
    if (!this.hasInitEmit) {
      this.hasInitEmit = true;
    }
    const newParam = MyObject.pickTrueItems(params);
    // console.log('pag navigate emit:', params);
    if (this.keep) {
      this.router.navigate(['./'], {
        relativeTo: this.route,
        queryParams: newParam,
      });
    }
    // console.log('pag navigate emit:', newParam);
    this.change.emit(newParam);
  }
}

export function queryParamMap(q: any) {
  const keys = {};
  for (const key of q.keys) {
    const v = q.get(key); // 获得值
    if (MyAssets.isEmpty(v)) {
      continue;
    }
    // @ts-ignore
    keys[key] = MyAssets.isNumber(v) ? parseInt(v, 10) : v;
  }
  return keys;
}
