import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  template: `
    <div>
      <form [formGroup]="mo" class="lib-form">

        <lib-form-input [form]="mo" name="name" required label="NAME"></lib-form-input>

        <div style="width: 610px;">
          <lib-map-position [form]="mo"></lib-map-position>
          <div class="placeholder">请点击选择正确的收件位置</div>
          <div>坐标: {{mo.get('lat')?.value}}, {{mo.get('lng')?.value}}</div>
        </div>
      </form>

      <div>值:{{mo.value|json}}</div>
    </div>
  `
})
export class DemoMapComponent implements OnInit {

  mo = this.fb.group({
    name: ['', [Validators.required]],

    province: [''],
    province_code: [''],
    city: [''],
    city_code: [''],
    county: [''],
    county_code: [''],
    detail: [''],
    lat: [''],
    lng: [''],
  })

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.mo.patchValue({

      city: "潮州市",
      city_code: "",
      county: "潮安区",
      county_code: "",
      detail: "横溪工业区",
      lat: 23.690706,
      lng: 116.553541,
      province: "广东省",
      province_code: ""
    })
  }
}
