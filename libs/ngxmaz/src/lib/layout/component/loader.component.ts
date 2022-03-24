import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {AppBaseConfig, htmlTitle} from "@fsl/ngxbase";

import {MenuService} from "../service/menu.service";

@Component({
  selector: 'lib-layout-loader',
  template: `
    <ng-http-loader></ng-http-loader>`
})
export class LibLayoutLoaderComponent implements OnInit {
  constructor(
    private menuSer: MenuService,
    private router: Router,
    private title: Title,
    private config: AppBaseConfig,
  ) {
    htmlTitle(router, title, this.config.title)
  }

  ngOnInit() {
    this.menuSer.subscribe();
  }
}
