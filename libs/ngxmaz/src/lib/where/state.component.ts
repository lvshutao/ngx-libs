import {Component, Input} from "@angular/core";

import {Kv, MyTextService} from "my-tsbase";

@Component({
  selector: `lib-where-state`,
  template: `
    <mat-form-field floatLabel="always" class="width100">
      <mat-select placeholder="审核状态" [(ngModel)]="where.state">
        <mat-option value="">全部</mat-option>
        <mat-option *ngFor="let o of kvs" [value]="o.name">{{o.title}}</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class LibWhereStateComponent {
  @Input() where: any = {
    state: '',
  }

  @Input() kvs: Kv[] = MyTextService.mapStatusText;
}
