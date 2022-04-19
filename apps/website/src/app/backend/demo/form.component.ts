import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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

      <lib-editor [form]="mo" name="body"></lib-editor>

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
    body: ['']
  })

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.mo.patchValue({
      remark: 'OKOK',
    })
  }
}
