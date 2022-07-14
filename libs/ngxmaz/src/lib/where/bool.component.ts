import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Kv} from "my-tsbase";

@Component({
  selector: 'lib-where-bool',
  template: `
    <lib-where-select [ngClass]="class"
                      [label]="label" [value]="value"
                      [defText]="defText" [kvs]="kvs" (action)="action.emit($event)"></lib-where-select>`
})
export class LibWhereBoolComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() defText = '全部';
  @Input() class = 'width70';
  @Input() kvs: Kv[] = [
    {name: 'true', title: '是'},
    {name: 'false', title: '否'}
  ]

  @Output() action = new EventEmitter<string>();
}
