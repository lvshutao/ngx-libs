import {Injectable} from "@angular/core";

export const KEY_REDIRECT = 'redirect';

@Injectable({providedIn: 'root'})
/**
 * 登录回调地址
 */
export class RedirectService {

  /**
   * 保存回调地址
   * @param redirectURL
   */
  save(redirectURL: string | null) {
    if (redirectURL) {
      localStorage.setItem(KEY_REDIRECT, redirectURL)
    }
  }

  /**
   * 读取回调地址
   * @param clean
   */
  read(clean: boolean = true): string | null {
    const url = localStorage.getItem(KEY_REDIRECT);
    if (url) {
      if (clean) {
        localStorage.removeItem(KEY_REDIRECT);
        return url;
      }
    }
    return null;
  }
}
