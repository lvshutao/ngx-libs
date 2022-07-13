import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Kv} from "my-tsbase";

@Component({
  selector: 'lib-where-select',
  template: `
    <mat-form-field floatLabel="always" [ngClass]="class">
      <mat-select [(ngModel)]="value" [placeholder]="label" (valueChange)="action.emit($event)">
        <mat-option value="">{{defText}}</mat-option>
        <mat-option *ngFor="let o of kvs" [value]="o.name">{{o.title}}</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class LibWhereSelectComponent {
  @Input() value = '';
  @Input() label = '';
  @Input() class = 'width100'
  @Input() defText = '全部'
  @Input() kvs: Kv[] = [];
  @Output() action = new EventEmitter<string>();

}
