import {Component, Input} from "@angular/core";

import {Kv, MyTextService} from "my-tsbase";

@Component({
  selector: 'lib-where-status',
  template: `
    <mat-form-field floatLabel="always" class="width100">
      <mat-select placeholder="状态" [(ngModel)]="where.status">
        <mat-option value="">全部</mat-option>
        <mat-option *ngFor="let o of kvs" [value]="o.name">{{o.title}}</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class LibWhereStatusComponent {
  @Input() where: any = {
    status: '',
  }
  @Input() kvs: Kv[] = MyTextService.mapStatusOptions;
}
