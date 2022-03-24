import {Injectable, TemplateRef} from "@angular/core";

import {ComponentType} from '@angular/cdk/portal';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

import {Observable} from "rxjs";

import {ActionSheetData, DialogActionSheetComponent} from "./action-sheet";
import {DialogImageComponent} from "./image";
import {DialogAlertComponent} from "./alter";
import {DialogShareSheetComponent, ShareSheetData} from "./share-sheet";
import {DialogInputComponent, InputData} from "./input";
import {DialogTextareaComponent} from "./textarea";
import {ConfirmConfig, DialogConfirmComponent} from "./confirm";

@Injectable()
export class LibDialogService {
  constructor(private dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {

  }

  open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open(componentOrTemplateRef, config);
  }

  /**
   * 打开指定地址的图片
   * @param src 图片地址，字符串
   */
  openImage(src: string): any {
    if (src == '') {
      console.warn('image src is empty, open failed');
      return;
    }
    return this.dialog.open(DialogImageComponent, {
      data: src,
      // maxWidth: '800px',
      maxHeight: '800px',
    });
  }

  // 确定框：通常用于删除
  confirm(data: ConfirmConfig = {}): Observable<boolean> {
    const dialog = this.dialog.open(DialogConfirmComponent, {data});
    return dialog.afterClosed();
  }

  confirmReason(data: ConfirmConfig = {}): Observable<boolean> {
    const dialog = this.dialog.open(DialogConfirmComponent, {data: {data, ...{input: true}}});
    return dialog.afterClosed();
  }

  alert(data: ConfirmConfig = {}): Observable<void> {
    const dialog = this.dialog.open(DialogAlertComponent, {data});
    return dialog.afterClosed();
  }

  // 底部弹出的选择项
  actionSheet(data: ActionSheetData[]): Observable<string> {
    const dialog = this.bottomSheet.open(DialogActionSheetComponent, {data});
    return dialog.afterDismissed();
  }

  // 输入框
  input(data: InputData, config?: MatDialogConfig): Observable<string | null> {
    if (config) {
      config.data = data;
    } else {
      config = {data};
    }
    const dialog = this.dialog.open(DialogInputComponent, config);
    return dialog.afterClosed();
  }

  // 文本框
  textarea(data: InputData, config?: MatDialogConfig): Observable<string | null> {
    if (config) {
      config.data = data;
    } else {
      config = {data};
    }
    const dialog = this.dialog.open(DialogTextareaComponent, config);
    return dialog.afterClosed();
  }

  share(data: ShareSheetData): Observable<string | null> {
    const dialog = this.bottomSheet.open(DialogShareSheetComponent, {data});
    return dialog.afterDismissed();
  }
}
