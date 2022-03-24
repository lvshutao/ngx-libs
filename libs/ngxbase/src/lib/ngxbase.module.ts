import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MyDatePipe, MyDatetimePipe, MyDatetimeWeekPipe, MyDateWeekPipe} from "./pipe/datetime.pipe";
import {MyMoneyPipe} from "./pipe/money.pipe";
import {MyPricePipe} from "./pipe/price.pipe";
import {MyRepeatPipe} from "./pipe/repeat.pipe";

import {LibAvatarComponent, LibAvatarNameComponent} from "./component/avatar.component";
import {LibBarComponent} from "./component/bar.component";
import {LibHspaceComponent, LibVspace40Component, LibVspaceComponent} from "./component/space.component";
import {LibImageComponent, LibImagesGridComponent} from "./component/image.component";
import {LibLineComponent} from "./component/line.comonent";
import {LibLoadingComponent} from "./component/loading.component";
import {LibRowComponent, LibRowTitle4Component} from "./component/row.component";
import {LibSkeletonComponent} from "./component/skeleton.component";
import {LibSvgComponent} from "./component/svg.component";
import {LibDesktopComponent, LibDesktopRowComponent, LibMobileComponent} from "./component/media-query.component";
import {LibSearchComponent} from "./component/search.component";

import {FullscreenDirective} from "./directive/fullscreen.directive";

const PIPES = [
  MyDatePipe,
  MyDatetimePipe,
  MyDateWeekPipe,
  MyDatetimeWeekPipe,

  MyMoneyPipe,
  MyPricePipe,
  MyRepeatPipe,
];

const DIRECTIVES = [
  FullscreenDirective
];
const COMPONENTS = [
  LibAvatarComponent, LibAvatarNameComponent,
  LibBarComponent,

  LibHspaceComponent,
  LibVspaceComponent,
  LibVspace40Component,

  LibImageComponent,
  LibImagesGridComponent,

  LibLineComponent,
  LibLoadingComponent,

  LibRowComponent,
  LibRowTitle4Component,
  LibSkeletonComponent,

  LibSvgComponent,

  LibDesktopComponent,
  LibDesktopRowComponent,
  LibMobileComponent,

  LibSearchComponent,
];

@NgModule({
  declarations: [
    ...DIRECTIVES, ...COMPONENTS, ...PIPES,
  ],
  imports: [CommonModule, FormsModule],
  exports: [...DIRECTIVES, ...COMPONENTS, ...PIPES, CommonModule]
})
export class MyNgxBaseModule {}
