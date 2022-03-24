// https://vant-contrib.gitee.io/vant/v3/#/zh-CN/skeleton

import {Component} from '@angular/core';

@Component({
  selector: 'lib-skeleton',
  template: `
    <div class="van-skeleton van-skeleton--animate">
      <div class="van-skeleton__content">
        <h3 class="van-skeleton__title"></h3>
        <div class="van-skeleton__row" style="width: 100%;"></div>
        <div class="van-skeleton__row" style="width: 100%;"></div>
        <div class="van-skeleton__row" style="width: 60%;"></div>
      </div>
    </div>`,
  styles: [`
    .van-skeleton--animate {
      animation: van-skeleton-blink 1.2s ease-in-out infinite;
    }

    .van-skeleton {
      display: flex;
      padding: 20px;
    }

    .van-skeleton__content {
      width: 100%;
    }

    .van-skeleton__title {
      width: 40%;
      margin: 0;
    }

    .van-skeleton__row, .van-skeleton__title {
      height: 16px;
      background-color: #f2f3f5;
    }

    .van-skeleton__title + .van-skeleton__row {
      margin-top: 20px;
    }

    .van-skeleton__row:not(:first-child) {
      margin-top: 12px;
    }

    .van-skeleton__row, .van-skeleton__title {
      height: 16px;
      background-color: #f2f3f5;
    }
  `]
})
export class LibSkeletonComponent {

}
