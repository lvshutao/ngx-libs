import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {httpParams} from '@fsl/ngxbase'

// https://lbs.amap.com/api/jsapi-v2/guide/abc/load 加载方式
// POI 分类编码/城市编码 https://lbs.amap.com/api/webservice/download
interface RstInputtips {
  status: string;
  info: string;
  infocode: string;
  count: string;
  tips: RstAddress[];
}

export interface RstAddress {
  id: string;
  name: string; // tip 名称 "古巷镇政府（公交站）"
  district: string; // 所属区域 "广东省潮州市潮安区"
  adcode: string; // 区域编码 "445103"
  location: string; // tip 中心点坐标 "116.575009,23.661602"
  address: string; // 详细地址 "102路;13路"
  typecode: string; //
}

@Injectable()
export class GaodeHttpService {
  // 使用原始 httpClient，在为不需要 withCredentials
  constructor(
    private http: HttpClient
  ) {
  }

  // https://lbs.amap.com/api/webservice/guide/api/inputtips
  inputtips(data: {
    key: string, // api key
    keywords: string, // 查询关键词
    city?: string; // 搜索编码
    citylimit?: boolean, // 仅返回指定城市数据，通常为 true
    type?: string, // POI 分
    datatype?: 'all' | 'poi' | 'bus' | 'busline', // 返回数据类型 all|poi|bus 公交站点|busline 公交线路
  }): Observable<RstAddress[]> {
    return this.http.get('https://restapi.amap.com/v3/assistant/inputtips', httpParams(data)).pipe(
      // @ts-ignore
      map((rst: RstInputtips) => {
        if (rst.info == 'OK') {
          return rst.tips;
        } else {
          return [];
        }
      })
    );
  }
}
