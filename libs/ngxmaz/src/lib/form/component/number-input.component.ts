import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractMazinput} from "./abstract.mazinput";
import {MyTypecast} from "my-tsbase";

@Component({
  selector: 'lib-form-number-input',
  template: `
    <mat-form-field floatLabel="always" [formGroup]="form" [class]="class">
      <input matInput type="number" style="text-align: center;"
             [min]="min"
             [required]="required"
             [formControlName]="name" #input (focus)="input.select()"
             [placeholder]="label"
      >
      <lib-form-clear [form]="form" [name]="name" matSuffix></lib-form-clear>
    </mat-form-field>`
})
export class NumberInputComponent extends AbstractMazinput {
  @Input() form!: FormGroup;
  @Input() name = '';
  @Input() min = 0;
  @Input() label = '';
  @Input() class = 'width100';
}


@Component({
  selector: `lib-form-price`,
  template: `
    <mat-form-field floatLabel="always" [class]="class">
      <input matInput type="number"
             [ngModel]="price"
             (ngModelChange)="priceChange($event)"
             [min]="min"
             [required]="required"
             [placeholder]="label"
             style="text-align: center;"
             #input (focus)="input.select()"
      >
      <lib-close-button matSuffix (click)="price=''"></lib-close-button>
    </mat-form-field>`
})
export class PriceInputComponent extends AbstractMazinput implements OnInit {
  @Input() form!: FormGroup;
  @Input() name = '';
  @Input() class = 'width150';
  @Input() min = 0;
  @Input() label = '';

  price = '';

  ngOnInit() {
    if (this.form && this.name) {
      const price = this.form.get(this.name)?.value;
      this.price = '' + (MyTypecast.str2Number(price) / 100);

      this.form.get(this.name)?.valueChanges.subscribe(newPrice => {
        this.price = '' + (MyTypecast.str2Number(newPrice) / 100);
      })
    }
  }

  priceChange(e: number) {
    this.form.patchValue({[this.name]: e * 100});
  }

}
