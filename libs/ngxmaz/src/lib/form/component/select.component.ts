import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Kv} from "my-tsbase";
import {AbstractMazinput} from "./abstract.mazinput";

@Component({
  selector: 'lib-form-select',
  template: `
    <mat-form-field floatLabel="always" [ngClass]="class" [formGroup]="form">
      <mat-select [formControlName]="name" [placeholder]="label" [required]="required"
                  (valueChange)="action.emit($event)">
        <mat-option [value]="defValue">{{defText}}</mat-option>
        <mat-option *ngFor="let o of kvs" [value]="o.name">{{o.title}}</mat-option>
      </mat-select>
    </mat-form-field>`
})
export class MazFormSelectComponent extends AbstractMazinput {
  @Input() form!: FormGroup;
  @Input() kvs!: Kv[];
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() class: string = 'width150';
  @Input() defValue: string | number = '';
  @Input() defText = '请选择';

  @Output() action = new EventEmitter<string>();
}
