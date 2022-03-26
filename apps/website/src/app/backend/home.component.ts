import {Component} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  template: `
    <div>
      <h3>表单</h3>
      <form [formGroup]="mo" class="lib-form">
        <mat-form-field floatLabel="auto">
          <input matInput formControlName="age" placeholder="年龄">
        </mat-form-field>
        <lib-form-input [form]="mo" name="name" required label="NAME"></lib-form-input>
        <lib-form-input [form]="mo" name="title" disabled label="TITLE"></lib-form-input>
        <lib-form-input [form]="mo" name="desc" readonly label="DESC"></lib-form-input>
      </form>

      <div>值:{{mo.value|json}}</div>
    </div>
    <div class="center" style="height: 300px;background: green;">会员中心</div>
    <div class="center" style="height: 300px;background: blue;">会员中心</div>
  `
})
export class HomeComponent {

  mo = this.fb.group({
    name: ['', [Validators.required]],
    title: new FormControl({value: '标题，禁用', disabled: true}),
    desc: ['描述, 只读'],
    age: [1]
  })

  constructor(
    private fb: FormBuilder
  ) {
  }
}
