import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {MyNgxBaseModule} from '@fsl/ngxbase'

import {ImageViewerConfig} from "./model";
import {ImageViewerComponent} from "./component/viewer";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

    MyNgxBaseModule,
  ],
  declarations: [
    ImageViewerComponent,
  ],
  exports: [
    ImageViewerComponent,
    MyNgxBaseModule,
  ]
})
export class MyMgxMazImageViewerModule {
  static forRoot(config?: ImageViewerConfig): ModuleWithProviders<any> {
    return {
      ngModule: MyMgxMazImageViewerModule,
      providers: [{provide: 'config', useValue: config}]
    };
  }
}
