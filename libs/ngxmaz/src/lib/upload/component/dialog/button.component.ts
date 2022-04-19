import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

import {UploadFileConfig, UploadResultBody} from "@fsl/ngxupload";
import {MazUploadDialogComponent} from "./dialog.component";

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
  @Input() text = ''; // 使用按钮文字
  @Input() autoClose = false;


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

  constructor(private dialog: MatDialog, private fileConfig: UploadFileConfig) {
  }

  openDialog(): void {
    this.dialog.open(MazUploadDialogComponent, {
      width: '90%', data: {
        multiple: true,
        autoClose: this.autoClose,
        allowType: this.fileConfig.allowTypes,
        preview: true,
      },
    }).afterClosed().subscribe((body: any) => {
      if (body) {
        this.whenSuccess.emit(body);
      }
    });
  }
}
