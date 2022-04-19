import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {FileActionService, MyNgxUploadConfig, UploadEngine, UploadResult} from "@fsl/ngxupload";
import {LibSnackService} from "../../../../index";

export interface MazUploadDialogConfig {
  multiple: boolean; // 多文件上传
  autoClose: boolean;
  preview: boolean;
  allowType: string; // 小写字母，比如 image/png;image/jpg;image/jpeg
}

@Component({
  template: `
    <div>
      <label class="mat-stroked-button" for="file">选择文件上传</label>
      <input id="file" type="file" style="visibility: hidden;" (change)="change($event)" [multiple]="data.multiple">
    </div>
    <div>
      <div *ngIf="htmlSer.has" style="overflow: hidden;">
        <lib-uploadmaz-file
          *ngFor="let file of htmlSer.queue;let i = index"
          [file]="file"
          [index]="i"
          [preview]="true"
          [toCancel]="toCancel"
          [toUpload]="toUpload"
          (whenUpload)="update($event)"
          (whenRemove)="remove($event)"></lib-uploadmaz-file>
      </div>
      <div style="margin: 10px 0;" class="margin-rb-group">
        <button mat-raised-button color="primary"
                [disabled]="toUpload"
                *ngIf="htmlSer.has" (click)="toUpload = true">
          <span *ngIf="data.multiple else text1">全部上传</span>
          <ng-template #text1>上传</ng-template>
        </button>
        <button mat-raised-button color="primary"
                *ngIf="toUpload"
                (click)="toCancel = true"
        ><span>取消上传</span></button>
        <button mat-raised-button color="warn" *ngIf="htmlSer.has" (click)="htmlSer.clear()">
          <span *ngIf="data.multiple else text2">全部移除</span>
          <ng-template #text2>移除</ng-template>
        </button>
        <button mat-raised-button
                color="primary"
                [disabled]="!htmlSer.complete"
                (click)="onClose()">
          <span>完成</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .margin-rb-group button, .margin-rb-group a {
      margin-right: 4px;
      margin-bottom: 4px;
    }
  `]
})
export class MazUploadDialogComponent implements OnInit {

  public htmlSer: FileActionService;
  public toUpload = false; // 全部上传，能否显示 "全部上传" 按钮
  public toCancel = false; // 取消上传，能否显示 "取消上传" 按钮

  private bodys: any[] = []; // 保存上传的结果

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MazUploadDialogConfig,
    private readonly conf: MyNgxUploadConfig,
    private engine: UploadEngine,
    private dialogRef: MatDialogRef<MazUploadDialogComponent>,
    private showSer: LibSnackService,
  ) {
    console.log('data:',data);
    this.htmlSer = new FileActionService({multiple: this.data.multiple, allowTypes: this.data.allowType})
  }


  ngOnInit(): void {
    this.engine.onInit();
  }

  change(event: Event) {
    event.stopPropagation();
    this.htmlSer.change(event, msg => {
      this.showSer.danger(msg);
    });
  }

  // 移除队列
  remove(index: number) {
    this.htmlSer.removeAt(index);
  }

  // 上传成功回调
  update(data: UploadResult) {
    if (this.conf.debug) {
      console.log('成功回调:', data);
    }
    this.bodys.push(data.body); // 保存上传结果
    this.htmlSer.uploadSuccess(data.index);

    if (this.htmlSer.complete && this.data.autoClose) {
      this.dialogRef.close(this.bodys);
    }
  }

  onClose(): void {
    this.dialogRef.close(this.bodys);
  }
}
