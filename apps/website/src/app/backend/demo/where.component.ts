import {Component} from "@angular/core";
import {AbstractListPageComponent, ListPageConfig} from "@fsl/ngxmaz";
import {Params} from "@angular/router";
import {Kv} from "my-tsbase";

export interface Student {
  id: number;
  name: string;
  age: number;
}

@Component({
  template: `
    <lib-back-bar>
      <lib-where-status [where]="table.where"></lib-where-status>
      <lib-where-state [where]="table.where"></lib-where-state>
      <lib-where-input [value]="table.where.keyword" (action)="table.where.keyword=$event"
                       label="关键词"></lib-where-input>
      <lib-where-select [value]="table.where.kind" (action)="table.where.kind=$event"
                        [kvs]="kinds" label="分类"></lib-where-select>

      <lib-where-action [table]="table"></lib-where-action>
    </lib-back-bar>
    <lib-vspace></lib-vspace>
  <div>WHERE:{{table.where | json}}</div>

    <lib-paginator [table]="table" (change)="onSearch($event)"></lib-paginator>
  `
})
export class DemoWhereComponent extends AbstractListPageComponent<Student> {

  kinds: Kv[] = [
    {name: 'a', title: 'AA'},
    {name: 'b', title: 'BB'}
  ]

  protected override config(): ListPageConfig<Student> {
    return {
      path: 'tc/admin2/article', backupWhere: {status: '', state: '', keyword: 'Lily', kind: ''},
      content: "确定要移除当前学生吗？", deleteParams(o: Student): Params | null {
        return {id: o.id};
      }, editParams(o: Student): Params | null {
        return {id: o.id};
      }, editPath: "edit", statusParams(o: Student): Params | null {
        return {id: o.id}
      }
    }
  }
}
