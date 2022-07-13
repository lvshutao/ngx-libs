import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NgFormArrayService} from "@fsl/ngxbase";

@Component({
  template: `
    <form [formGroup]="mo" class="lib-form">
      <mat-form-field floatLabel="auto">
        <input matInput formControlName="age" placeholder="年龄">
      </mat-form-field>
      <lib-form-input [form]="mo" name="name" required label="NAME"></lib-form-input>
      <lib-form-input [form]="mo" name="title" disabled label="TITLE"></lib-form-input>
      <lib-form-input [form]="mo" name="desc" label="DESC"></lib-form-input>
      <lib-form-input [form]="mo" name="remark" label="REMARK"></lib-form-input>

      <lib-form-price [form]="mo" name="price" label="价格(元)"></lib-form-price>
      <lib-hspace></lib-hspace>
      <a mat-stroked-button (click)="mo.patchValue({price:200})">更改价格</a>


      <lib-editor [form]="mo" name="body" [height]="100"></lib-editor>

      <div formArrayName="attr">
        <h2>字符串数组</h2>
        <a mat-icon-button (click)="nfa.insertItem()">
          <mat-icon>add_circle_outline</mat-icon>
        </a>
        <div *ngFor="let alias of nfa.controllers; let i=index">
          <label for="alias-{{ i }}">Alias {{i}}:</label>
          <input id="alias-{{ i }}" type="text" [formControlName]="i">
          <a mat-icon-button *ngIf="nfa.hasMore" color="warn" (click)="nfa.removeItem(i)">
            <mat-icon>remove_circle_outline</mat-icon>
          </a>
        </div>
      </div>

      <div formArrayName="student">
        <h3>对象数组</h3>
        <a mat-icon-button (click)="stuNfa.insertItem()">
          <mat-icon>add_circle_outline</mat-icon>
        </a>
        <div formArrayName="student">
          <div *ngFor="let c of stuNfa.controllers; let i = index;">
            <div [formGroup]="stuNfa.toFormGroup(c)" class="row">
              <div class="flex1">
                <mat-form-field floatLabel="always" class="width100">
                  <input matInput formControlName="name" placeholder="Name">
                </mat-form-field>
                <mat-form-field floatLabel="always" class="width100">
                  <input matInput formControlName="age" placeholder="AGE">
                </mat-form-field>
              </div>
              <div style="width: 80px" class="flex pt8">
                <a mat-icon-button *ngIf="stuNfa.hasMore" color="warn" (click)="stuNfa.removeItem(i)">
                  <mat-icon>remove_circle_outline</mat-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>值:{{mo.value|json}}</div>
    </form>
  `
})
export class DemoFormComponent implements OnInit {

  mo = this.fb.group({
    name: ['', [Validators.required]],
    title: new FormControl({value: '标题，禁用', disabled: true}),
    desc: ['描述, 只读'],
    age: [1],
    remark: [''],
    body: [''],
    price: [10000],
    attr: this.fb.array([
      this.fb.control('')
    ]),
    student: this.fb.array([]),
  })

  nfa: NgFormArrayService;
  stuNfa: NgFormArrayService;

  constructor(
    private fb: FormBuilder
  ) {
    this.nfa = new NgFormArrayService(this.fb)
    this.nfa.bind(this.mo, 'attr', () => {
      return this.fb.control('');
    })

    this.stuNfa = new NgFormArrayService(this.fb);
    this.stuNfa.bind(this.mo, 'student', () => {
      return this.fb.group({
        name: [''],
        age: [0],
      })
    })
  }

  ngOnInit() {
    this.mo.patchValue({
      remark: 'OKOK',
    })
    this.nfa.addItemsOfFormControlValues(['a', 'b', 'c'])
    this.stuNfa.addItemsOfFormGroupValues([{name: 'A', age: 1}, {name: 'B', age: 2}])
  }
}
