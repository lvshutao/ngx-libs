import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";

export interface TagKv {
  id: number;
  title: string;
  article_id?: number;
}

@Component({
  selector: 'lib-form-tags',
  template:`<div class="row">
    <div class="flex1">
      <mat-form-field class="example-chip-list">
        <mat-chip-list #chipList>
          <mat-chip
            *ngFor="let t of tags"
            [selectable]="selectable"
            [removable]="removable"
            (removed)="remove(t)">
            {{t.title}}
            <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
          </mat-chip>
          <input
            #tagInput
            [formControl]="fruitCtrl"
            [matAutocomplete]="auto"
            [matChipInputFor]="chipList"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            [matChipInputAddOnBlur]="addOnBlur"
            (matChipInputTokenEnd)="add($event)">
        </mat-chip-list>
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
          <mat-option *ngFor="let o of options" [value]="o.title">
            {{o.title}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
    <div *ngIf="button" style="width: 100px;">
      <div class="pt10"></div>
      <a mat-button (click)="search.emit()">
        <mat-icon>search</mat-icon>
        搜索</a>
    </div>
  </div>
  `
})
export class TagsComponent {
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  @Input() tags: TagKv[] = []; // 选中的
  @Input() options: TagKv[] = []; // 候选的
  @Input() button = true; // 是否显示选择按钮

  @Output() change = new EventEmitter<TagKv[]>();
  @Output() search = new EventEmitter();

  // @ts-ignore
  @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // console.log('prepare add:', value, this.matAutocomplete.isOpen);
    // 记录输入的值
    if (value) {
      const index = this.tags.findIndex(t => t.title == value);
      if (index < 0) {
        this.tags.push({id: 0, title: value});
        this.change.emit(this.tags);
      }
    }

    // Reset the input value
    const input = event.input;
    if (input) {
      input.value = '';
    }
    this.fruitCtrl.setValue(null);
  }

  remove(tag: TagKv): void {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
    this.options.push(tag);
    this.change.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const v = event.option.value; // 不使用 viewValue

    const index = this.selectedIndex(v);
    this.tags.push(this.options[index]);
    this.options.splice(index, 1);

    // 重置值
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.change.emit(this.tags);
  }

  selectedIndex(v: string): number {
    return this.options.findIndex(e => e.title == v);
  }
}
