// @ts-ignore
import AMapLoader from '@amap/amap-jsapi-loader';

export interface AreaPoint {
  lng: string; // 经度
  lat: string; // 纬度
  zoom?: number; // 显示级别
}

export class GaodeMapService {

  private map: any;
  private marker: any;
  // @ts-ignore
  private pointChange: Function;
  private error = false;
  private apiKey = '';
  private idName = 'container';

  private onLoad = (AMap: any) => {
    if (this.error) {
      console.log('onLoad map failed, apiKey is empty');
      return;
    }

    this.map = new AMap.Map(this.idName, {
      zoom: 18, // 12 显示市(初始化)， 18 显示小地图
      // center: this.areaPoint2LngLat(this.ap),
      resizeEnable: true,
    });

    this.map.addControl(new AMap.ToolBar({
      liteStyle: true,
    }));

    this.marker = new AMap.Marker({
      position: this.map.getCenter(),
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      // @ts-ignore
      offset: new AMap.Pixel(-13, -30),
      // 设置是否可以拖拽
      draggable: true,
      cursor: 'move',
      // 设置拖拽效果
      raiseOnDrag: false
    });
    // https://lbs.amap.com/api/javascript-api/reference/overlay#marker
    // 支持通过点击修改定位 e 只有坐标，没有具体信息
    this.map.on('click', (e: any) => {
      this.map.setCenter(e.lnglat);
      this.marker.setPosition(e.lnglat);
      if (this.pointChange) {
        this.pointChange(this.lnglat2AreaPoint(e));
      }
    });

    // 支持通过拖拽 Marker 方式修改定位
    this.marker.setMap(this.map);
    this.marker.on('dragend', (e: any) => {
      if (this.pointChange) {
        this.pointChange(this.lnglat2AreaPoint(e));
      }
    });
  };

  constructor(apiKey: string, load: Function) {
    if (!apiKey) {
      this.error = true;
      console.error('必须提供高德地图接口 key');
    } else {
      this.apiKey = apiKey;

      AMapLoader.load({
        'key': apiKey,              // 申请好的Web端开发者Key，首次调用 load 时必填
        'version': '1.4.15',   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        'plugins': ['AMap.ToolBar'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        'AMapUI': {             // 是否加载 AMapUI，缺省不加载
          'version': '1.1',   // AMapUI 缺省 1.1
          'plugins': [],       // 需要加载的 AMapUI ui插件
        },
        'Loca': {                // 是否加载 Loca， 缺省不加载
          'version': '1.3.2'  // Loca 版本，缺省 1.3.2
        },
      }).then((AMap: any) => {
        this.onLoad(AMap);
        load();
      }).catch((e: any) => {
        console.error(e);
      });


      // https://lbs.amap.com/api/jsapi-v2/guide/abc/load
    }
  }

  get key(): string {
    return this.apiKey;
  }

  addPointChangeCallback(callback: Function) {
    this.pointChange = callback;
  }

// const center = this.addressTips[index].location.split(',');
  // 一个数组，[lng, lat]
  mapCenterChange(center: string[]) {
    if (this.error) {
      console.log('change gaode map center failed');
      return;
    }
    if (!this.map) {
      console.log('change gaode map center before map create');
      return;
    }
    console.log('mapCenterChange:', center);
    this.map.setZoom(18);
    this.map.setCenter(center);
    this.marker.setPosition(center);
    if (this.pointChange) {
      this.pointChange({
        lng: center[0], lat: center[1],
      });
    }
  }


  // https://lbs.amap.com/api/javascript-api/reference/core#LngLat
  areaPoint2LngLat(ap: AreaPoint) {
    // @ts-ignore
    return AMap.LngLat(ap.lng, ap.lat, false);
  }

  lnglat2AreaPoint(e: any): AreaPoint {
    return {
      lng: e.lnglat.lng,
      lat: e.lnglat.lat
    };
  }
}
