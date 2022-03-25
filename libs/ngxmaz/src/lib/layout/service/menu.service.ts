import {Injectable} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {filter, Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class MenuService {
  /**
   * 菜单列表
   */
  menus: SidenavMenu[] = [];

  private navEvent: Observable<NavigationStart>;
  /**
   * 当前功能模块的名称
   */
  private name = '';
  private cacheMenus = {};
  private hasSub = false; // 防止重复订单

  title = ''; // 标题

  constructor(router: Router) {
    this.navEvent = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  get hasMenus(): boolean {
    return this.menus && this.menus.length > 0;
  }

  subscribe() {
    if (this.hasSub) {
      return;
    }

    this.hasSub = true;
    this.navEvent.subscribe(evt => {
      const p = evt.url.indexOf('/') === 0 ? evt.url.substring(1) : evt.url;
      const els = p.split('/');

      // 获取模块及其子模块
      while (els.length > 0) {
        const name = els.join('/');
        // eslint-disable-next-line no-prototype-builtins
        if (this.cacheMenus.hasOwnProperty(name)) {
          this.name = name;
          this.menus = this.getMenus(name);
          return;
        }
        els.pop();
      }
    })
  }

  /**
   * 获取菜单
   */
  private getMenus(name: string): SidenavMenu[] {
    if (name) {
      // @ts-ignore
      return this.cacheMenus[name];
    } else {
      return [];
    }
  }

  /**
   * 如果存在，则替换掉
   */
  public addMenus(name: string, menus: SidenavMenu[]) {
    this.name = name;
    this.menus = menus;
    // @ts-ignore
    this.cacheMenus[name] = menus;
  }

  public clear() {
    this.name = '';
    this.menus = [];
  }
}

export interface SidenavMenu {
  text: string;
  icon?: string; // 图标（优先)
  src?: string; // 图标 20px * 20px
  route?: any;
  expanded?: boolean; // 是否展开
  children?: SidenavMenu[]; // 如果存在，则作为分组菜单处理
  disabled?: boolean; // 是否可用
}
