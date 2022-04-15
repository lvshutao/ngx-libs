import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AllowImageType, UploadResultBody} from "@fsl/ngxupload";
import {MazUploadDialogComponent} from "./dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  template: `<a mat-button *ngIf="text;else icon;" (click)="openDialog()">{{text}}</a>
  <ng-template #icon>
    <a mat-icon-button (click)="openDialog()">
      <mat-icon>cloud_upload</mat-icon>
    </a>
  </ng-template>`,
  selector: 'lib-uploadmaz-button',
})
export class LibUploadMazDialogButtonComponent {

  @Input() multiple = true; // 多文件上传
  @Input() autoClose = true; // 上传完成后自动关闭
  @Input() allowType = AllowImageType; // 允许的类型
  @Input() preview = true; // 预览
  @Input() text = ''; // 使用按钮文字

  /**
   * 响应结果
   * [
   *     {
   *         "url": "http://assets.emm365.com/Fnrb49gFZVhV0jZ-QsoywQh0bUel",
   *         "scope": "fsl-media",
   *         "key": "Fnrb49gFZVhV0jZ-QsoywQh0bUel"
   *     },
   *     {
   *         "url": "http://assets.emm365.com/FrELnQNpb3J1sx6nV5TAOiyz2AZ8",
   *         "scope": "fsl-media",
   *         "key": "FrELnQNpb3J1sx6nV5TAOiyz2AZ8"
   *     }
   * ]
   */
  @Output() whenSuccess = new EventEmitter<UploadResultBody[]>();

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(MazUploadDialogComponent, {
      width: '90%', data: {
        multiple: this.multiple,
        autoClose: this.autoClose,
        allowType: this.allowType,
        preview: this.preview,
      },
    }).afterClosed().subscribe((body: any) => {
      if (body) {
        this.whenSuccess.emit(body);
      }
    });
  }
}
