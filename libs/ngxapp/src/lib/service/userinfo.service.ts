import {UserBase} from "../model/user.model";

const cacheKey = '_user';

export class UserinfoService {
  static save(info: UserBase) {
    localStorage.setItem(cacheKey, JSON.stringify(info));
  }

  static clear() {
    localStorage.removeItem(cacheKey);
  }

  static read(): UserBase | null {
    const d = localStorage.getItem(cacheKey)
    if (d) {
      return JSON.parse(d);
    }
    return null
  }
}
