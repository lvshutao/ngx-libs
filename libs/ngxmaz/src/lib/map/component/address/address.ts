import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AreaDataService, AreaElem} from "../../service/area-data.service";

@Component({
  selector: 'lib-map-address',
  templateUrl: 'address.html'
})
export class LibMapAddressComponent {

  @Input() province = '';
  @Input() city = '';
  @Input() county = '';

  @Output() select = new EventEmitter<{ name: string, value: string }>();

  // 提取地址列表中的省份
  get provinceList(): AreaElem[] {
    return AreaDataService.provinceList;
  }

  get cityList(): AreaElem[] {
    return AreaDataService.cityList(this.province, code => {
    });
  }

  get countyList(): AreaElem[] {
    return AreaDataService.countyList(this.province, this.city, code => {
    });
  }

  onAreaChange(name: string, e: any) {
    this.select.emit({name, value: e.value});
  }
}
