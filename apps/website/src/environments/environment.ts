// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appBaseConfig: {
    name: 'admin-local',
    title: '测试站点',
    debug: true,
    origin: 'http://pp.test',
    manualToken: true,
    tokenDomains: ['pp.test']
  },
  map: {
    gaodeKey: '82c509bf7f0ee518c5f2d84b2a25700b',
    debug: false,
  },
  upload: {
    isQiniu: true,
    qiniuTokenUrl: 'http://pp.test/api/base/user/upload-cert', // 七牛证书地址
    serverUploadUrl: '',
    debug: true,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
