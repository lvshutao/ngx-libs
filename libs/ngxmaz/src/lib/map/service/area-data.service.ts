import {areaList} from '@vant/area-data';
import {FormBuilder, FormGroup} from '@angular/forms';


export interface AreaElem {
  code: string;
  name: string;
}

/*
const areaList = {
  province_list: {
    110000: '北京市', 120000: '天津市',
  },
  city_list: {
    110100: '北京市', 120100: '天津市',
  },
  county_list: {
    110101: '东城区', 110102: '西城区',
  }
}
 */
export class AreaDataService {

  private static _initProvince = false;

  /**
   * 提取地址列表中的省份（转为数组)
   */
  static get provinceList(): AreaElem[] {
    if (this._provinceList.length == 0 && !this._initProvince) {
      this._initProvince = true;

      this._provinceList = Object.keys(areaList.province_list).map(k => {
        return {
          code: k,
          // @ts-ignore
          name: areaList.province_list[k],
        };
      });
    }
    return this._provinceList;
  }

  // 缓存
  private static _provinceList: AreaElem[] = [];
  private static _provinceName = ''; // 当前省份名称

  private static _cityList: AreaElem[] = []; // 当前省份下的城市列表
  private static _cityName = ''; // 当前城市名称

  private static _countyList: AreaElem[] = []; // 当前城市下的乡镇列表
  private static _countyName = '';


  /**
   * 获取省份对应的 code 码
   * @param provinceName {string}
   */
  private static provinceCode(provinceName: string): string {
    const index = this.provinceList.findIndex(p => p.name == provinceName);
    if (index > -1) {
      return this.provinceList[index].code;
    } else {
      console.warn('could not find province(', provinceName, ') code');
    }
    return '';
  }


  /**
   * 提取对应的城市
   * @param province {string} 省份的名称
   * @param findProvinceCode {Function}
   */
  static cityList(province: string, findProvinceCode: (code: string) => void): AreaElem[] {
    if (this._provinceName == province) {
      return this._cityList;
    }

    if (province) {
      const provinceCode = this.provinceCode(province);
      if (provinceCode) {
        this._provinceName = province; // 缓存
        if (findProvinceCode) {
          findProvinceCode(provinceCode); // 回调
        }

        const preCode = provinceCode.slice(0, 2); // 前两位
        this._cityList = Object.keys(areaList.city_list)
          .filter(k => k.startsWith(preCode))
          .map(code => {
            return {
              code: code,
              // @ts-ignore
              name: areaList.city_list[code],
            };
          });
      }
    }
    return [];
  }

  private static cityCode(province: string, city: string): string {
    if (province && city) {
      // @ts-ignore
      const cityList = this.cityList(province, null);
      const index = cityList.findIndex(c => c.name == city);
      if (index > -1) {
        return cityList[index].code;
      } else {
        console.warn('could not find province city(', province, city, ') code');
      }
    }
    return '';
  }


  static countyList(province: string, city: string, findCityCode: (code: string) => void): AreaElem[] {
    if (this._provinceName == province && this._cityName == city) {
      return this._countyList;
    }
    if (province && city) {

      const cityCode = this.cityCode(province, city);
      if (cityCode) {
        this._cityName = city;
        if (findCityCode) {
          findCityCode(cityCode);
        }
        const preCode = cityCode.slice(0, 4);
        this._countyList = Object.keys(areaList.county_list)
          .filter(k => k.startsWith(preCode)).map(code => {
            return {
              code: code,
              // @ts-ignore
              name: areaList.county_list[code],
            };
          });
        return this._countyList;
      }
    }
    return [];
  }


  static countyCode(province: string, city: string, county: string): string {
    if (province && city && county) {
      // @ts-ignore
      const countyList = this.countyList(province, city, null);
      const index = countyList.findIndex(p => p.name == county);
      if (index > -1) {
        return countyList[index].code;
      }
    }
    return '';
  }

  /**
   * api 参数，表示搜索的地址范围，优先使用 county，以提高精确度
   * @param province {string} 省份名称
   * @param city {string} 城市名称
   * @param county {string} 村镇名称
   */
  static queryCode(province: string, city: string, county: string): string {
    return this.countyCode(province, city, county) || this.cityCode(province, city) || '';
  }

}

export class CacheAddress {
  province: string = '';
  province_code: string = '';
  city: string = '';
  city_code: string = '';
  county: string = '';
  county_code: string = '';
}

export function addressForm(fb: FormBuilder) {
  return fb.group({
    province: [''],
    province_code: [''],
    city: [''],
    city_code: [''],
    county: [''],
    county_code: [''],
    detail: [''],
    lat: [0],
    lng: [0],
  });
}

export class AddressForm {
  private _mo: FormGroup;

  constructor(fb: FormBuilder) {
    this._mo = addressForm(fb);
  }

  replaceForm(mo: FormGroup) {
    this._mo = mo;
  }

  get mo(): FormGroup {
    return this._mo;
  }


  // 省份名称
  get province(): string {
    // @ts-ignore
    return this._mo ? this._mo.get('province').value : '';
  }

  // 城市名称
  get city(): string {
    // @ts-ignore
    return this._mo ? this._mo.get('city').value : '';
  }

  // 乡镇名称
  get county(): string {
    // @ts-ignore
    return this._mo ? this._mo.get('county').value : '';
  }

  get provinceCode(): string {
    // @ts-ignore
    return this.mo ? this.mo.get('province_code').value : '';
  }

  get cityCode(): string {
    // @ts-ignore
    return this.mo ? this.mo.get('city_code').value : '';
  }

  get countyCode(): string {
    // @ts-ignore
    return this.mo ? this.mo.get('county_code').value : '';
  }

  get cacheAddress(): CacheAddress {
    return {
      province: this.province, province_code: this.provinceCode,
      city: this.city, city_code: this.cityCode, county: this.county, county_code: this.countyCode
    };
  }

  static addressText(adds: { province: string, city: string, county: string, detail: string }): string {
    return [
      adds.province || '',
      adds.city || '',
      adds.county || '',
      adds.detail || '',
    ].join('');
  }
}
