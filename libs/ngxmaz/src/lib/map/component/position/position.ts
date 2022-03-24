/* eslint-disable */
import { FormBuilder, FormGroup} from "@angular/forms";
import {Component, Input, OnInit} from "@angular/core";

import {debounceTime, distinctUntilChanged, filter, fromEvent, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {MyTypecast} from "my-tsbase";

import {AddressForm, AreaDataService, AreaElem, CacheAddress} from "../../service/area-data.service";
import {GaodeHttpService, RstAddress} from "../../service/gaode-http.service";
import {AreaPoint, GaodeMapService} from "../../service/gaode-map.service";
import {MyNgxMazMapConfig} from "../../config";

// 缓存最近选择的 province|city|county
// <div style="width: 610px;">...</div>
const key = 'map-address';

// https://lbs.amap.com/demo/javascript-api/example/input/input-prompt
@Component({
  selector: 'lib-map-position',
  templateUrl: 'position.html',
  styles: [`
    #container {
      width: 600px;
      height: 400px;
    }
  `
  ]
})
export class LibMapPositionComponent implements OnInit {
  // 表单
  @Input()
  set form(mo: FormGroup) {
    if (mo) {
      this.addressForm.replaceForm(mo);
      this.mo = mo;
    }
  }

  // 保存最近选择的省市区
  @Input() keep = true;
  // 显示地图
  @Input() map = true;

  // gaode 地图地址提示列表
  addressTips: RstAddress[] = [];
  // 使用高德地图
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private gaoDe: GaodeMapService;

  mo: FormGroup;
  private addressForm: AddressForm;

  constructor(private fb: FormBuilder,
              private http: GaodeHttpService,
              private config: MyNgxMazMapConfig,
  ) {
    if (this.config.gaodeKey == '') {
      console.error("高德地图 key 不能为空")
    }
    this.addressForm = new AddressForm(fb);
    this.mo = this.addressForm.mo;
  }

  // 提取地址列表中的省份
  get provinceList(): AreaElem[] {
    return AreaDataService.provinceList;
  }

  get cityList(): AreaElem[] {
    return AreaDataService.cityList(this.addressForm.province, code => {
      if (this.config.debug) {
        console.log('province code:', code);
      }
      this.mo.patchValue({province_code: code});
    });
  }

  get countyList(): AreaElem[] {
    return AreaDataService.countyList(this.addressForm.province, this.addressForm.city, code => {
      if (this.config.debug) {
        console.log('city code:', code);
      }
      this.mo.patchValue({city_code: code});
    });
  }

  // api 参数，表示搜索的地址范围，优先使用 county，以提高精确度
  private get queryCode(): string {
    return AreaDataService.queryCode(this.addressForm.province, this.addressForm.city, this.addressForm.county);
  }

  private ListenDetailInput() {
    // 输入提示
    const searchBox = document.getElementById('detail-box');
    // @ts-ignore
    const typeahead = fromEvent(searchBox, 'input').pipe(
      // @ts-ignore
      map((e: KeyboardEvent) => {
        return (e.target as HTMLInputElement).value;
      }),
      filter(text => text.length > 2), // 最小长度
      debounceTime(1500), // 防抖 2秒
      distinctUntilChanged(), // 输入变化
      switchMap((value) => {
        return this.http.inputtips({
          key: this.gaoDe.key,
          keywords: this.detail,
          city: this.queryCode,
          citylimit: true,
          datatype: 'all',
        });
      })
    );
    typeahead.subscribe(data => {
      this.addressTips = data;
    });
  }

  ngOnInit() {
    // 高德地图
    if (this.map) {
      this.gaoDe = new GaodeMapService(this.config.gaodeKey, () => {
        // 如果已经有 point
        const tc = setTimeout(() => {
          if (this.config.debug) {
            console.log('address:', this.mo.value, ';point:', this.mo.value);
          }
          if (this.detail) {
            // @ts-ignore
            const lng = this.mo.get('lng').value;
            // @ts-ignore
            const lat = this.mo.get('lat').value;
            this.gaoDe.mapCenterChange([lng, lat]);
          }

          clearTimeout(tc);
        }, 500);
      });
      // 回调
      this.gaoDe.addPointChangeCallback((ap: AreaPoint) => {
        this.mo.patchValue({
          lng: MyTypecast.str2Number(ap.lng), lat: MyTypecast.str2Number(ap.lat),
        });
      });

      this.ListenDetailInput();
    }

    // 检查是否有预填充值，如果没有，则可能选择最近填写地址
    if (this.keep) {
      const t = setTimeout(() => {
        if (!this.addressForm.county && !this.addressForm.city && !this.addressForm.province) {
          this.recoverCacheAddress();
        }
        clearTimeout(t);
      }, 500);
    }
  }

  private cacheAddress() {
    if (this.keep) {
      localStorage.setItem(key, JSON.stringify(this.addressForm.cacheAddress));
    }
  }

  private recoverCacheAddress() {
    const data = localStorage.getItem(key); // 缓存的地址
    if (data) {
      const adds = JSON.parse(data) as CacheAddress;
      if (!!adds.county_code) {
        this.mo.patchValue(adds);
      }
    }
  }

  // 在 province/city/county 变动时使用
  onAreaChange(name: string, e: any) {
    if (name == 'province') {
      this.mo.patchValue({city: '', city_code: '', county: '', county_code: ''});
    } else if (name == 'city') {
      this.mo.patchValue({county: '', county_code: ''});
    } else if (name == 'county') {
      this.mo.patchValue({county_code: AreaDataService.countyCode(this.addressForm.province, this.addressForm.city, e.value)});
      this.cacheAddress();
    }
    if (this.config.debug) {
      console.log('name:', name, e.value, this.mo.value);
    }
  }

  // 详细地址值
  private get detail(): string {
    // @ts-ignore
    return this.mo.get('detail').value || '';
  }

  // 根据详细地址请求地址提示
  onDetailChange() {
    if (this.map) {
      // 点击输入提示时
      const index = this.addressTips.findIndex(p => p.name == this.detail);
      if (index > -1) {
        // https://lbs.amap.com/demo/javascript-api/example/mapbar/toolbar-litestyle
        /*
        {
            "id": "B0FFHD6GF0",
            "name": "横溪小学",
            "district": "广东省潮州市潮安区",
            "adcode": "445103",
            "location": "116.555881,23.687999",
            "address": "古巷镇横溪村",
            "typecode": "140000",
            "city": []
        }
         */
        if (this.config.debug) {
          console.log('select add:', this.addressTips[index])
        }
        const center = this.addressTips[index].location.split(',');
        if (this.config.debug) {
          console.log('detail change center:', center);
        }
        this.gaoDe.mapCenterChange(center);
      }
    }
  }
}
