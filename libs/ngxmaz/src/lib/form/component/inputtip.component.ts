import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'lib-form-inputtip',
  template: `
    <mat-form-field floatLabel="always" style="width: 150px">
      <input id="keyword-box" matInput [(ngModel)]="keyword"
             [matAutocomplete]="auto" [placeholder]="label">
      <lib-clear-button matSuffix (click)="clear()"></lib-clear-button>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onOptionChange()">
        <mat-option *ngFor="let text of options;" [value]="text">{{text}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>`
})
export class MazFormInputtipComponent implements OnInit {
  @Input() keyword = '';

  // 选项
  @Input() options: string[] = [];
  @Input() label = '关键字';

  @Input() minLength = 1;
  @Input() debounce = 1500; // 防抖 1.5 s

  @Output() search = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  constructor() {

  }

  private listenInput() {
    const searchBox = document.getElementById('keyword-box');
    // @ts-ignore
    const typeahead = fromEvent(searchBox, 'input').pipe(
      // @ts-ignore
      map((e: KeyboardEvent) => {
        return (e.target as HTMLInputElement).value;
      }),
      filter(text => text.length > this.minLength),
      debounceTime(this.debounce),
      distinctUntilChanged(),
    );
    typeahead.subscribe(data => {
      this.search.emit(data);
    });
  }

  ngOnInit() {
    this.listenInput();
  }

  onOptionChange() {
    this.select.emit(this.keyword);
  }

  clear() {
    this.select.emit('');
  }
}
