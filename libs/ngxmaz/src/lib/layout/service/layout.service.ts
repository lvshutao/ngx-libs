import {Injectable} from "@angular/core";

@Injectable()
/**
 * 每个模块需要单独提供，以免互相影响
 */
export class LayoutService {
  /**
   * 是否启用左侧侧边栏
   */
  useLeft = false;
  /**
   * 左侧侧边栏状态
   */
  leftOpened = false;
  /**
   * 是否启用右侧侧边栏
   */
  useRight = false;
  /**
   * 右侧侧边栏状态
   */
  rightOpened = false;

  selfLeft = false;
  selfRight = false;

  leftToggle() {
    if (this.useLeft) {
      this.leftOpened = !this.leftOpened;
    }
    this.selfLeft = !this.selfLeft;
  }

  rightToggle() {
    if (this.useRight) {
      this.rightOpened = !this.rightOpened;
    }
    this.selfRight = !this.selfRight;
  }

  reset() {
    Object.assign(this, {
      useLeft: false, leftOpened: false,
      useRight: false, rightOpened: false,
    })
  }

  assign(obj: {
    useLeft?: boolean, useRight?: boolean,
    leftOpened?: boolean,
    rightOpened?: boolean
  }) {
    Object.assign(this, obj);
  }
}
