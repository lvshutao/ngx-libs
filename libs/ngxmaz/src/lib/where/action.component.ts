import {Component, Input} from "@angular/core";
import {MyTableService} from "my-tsbase";

@Component({
  selector: 'lib-where-action',
  template: `
    <span style="padding-right:6px;">&nbsp;</span>
    <a mat-button (click)="table.onSubmit()">搜索</a>
    <a mat-button (click)="table.onReset()">重置</a>
    <span style="padding-right:6px;">&nbsp;</span>
  `,
})
export class LibWhereActionComponent {
  @Input() table: any;
}
