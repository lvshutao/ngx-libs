// 打开指定窗口，并监听授权
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root',})
export class WinService {
  // 跟 auth/component/login.component.ts 存在重复
  // 授权成功后，需要跳转到 auth/component.token 所注册的地址
  // 打开授权中心界面
  // https://ng-alain.github.io/ng-alain/#/passport/login
  // https://github.com/ng-alain/delon/blob/master/packages/auth/src/social/social.service.ts
  // 1. via window
  // 2. via redirect
  openWith(url: string, callback: () => void) {
    if (url.length < 1) {
      return;
    }
    let _win = window.open(url, '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    const _winTime = setInterval(() => {
      if (_win && _win.closed) {
        clearInterval(_winTime);
        _win = null;
        console.log('window close');
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    }, 1000);
  }
}
