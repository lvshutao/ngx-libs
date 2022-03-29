import {DomSanitizer} from '@angular/platform-browser';

import {MatIconRegistry} from '@angular/material/icon';

/**
 * 使用 mat-icon 组件显示 svg 图标
 * @param ir {@angular/material/MdIconRegistry}
 * @param ds {@angular/platform-browser/DomSanitizer}
 * @param svgList {Object} 图标
 * @example
 * export class CoreModule {
 *   constructor(ir: MdIconRegistry, ds: DomSanitizer) {
 *     loadSvgResources(ir, ds, {gifts:'assets/fullscreen-exit.svg'});
 *   }
 * }
 * <mat-icon svgIcon="gifts"></mat-icon>
 */
export const loadSvgResources =
  (ir: MatIconRegistry, ds: DomSanitizer, svgList: { [key: string]: string; }) => {
    if (svgList) {
      for (const name in svgList) {
        if (svgList[name]) {
          ir.addSvgIcon(name,
            ds.bypassSecurityTrustResourceUrl(svgList[name]));
        }
      }
    }
  };
