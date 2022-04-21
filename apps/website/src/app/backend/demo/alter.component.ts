import {Component} from "@angular/core";
import {LibSnackService} from "@fsl/ngxmaz";

@Component({
  template: `
    <div class="group-buttons">
      <a mat-button (click)="alter('danger')" color="warn">错误信息</a>
      <a mat-button (click)="alter('success')" color="primary">成功信息</a>
      <a mat-button (click)="alter('warning')">警告信息</a>
    </div>
  `
})
export class DemoAlterComponent {
  constructor(
    private showSer: LibSnackService,
  ) {
  }

  alter(kind: string) {
    switch (kind) {
      case 'danger':
        this.showSer.danger('这是一个错误信息')
        break;
      case 'success':
        this.showSer.success('操作成功')
        break;
      case 'warning':
        this.showSer.warning('这是一个警告消息');
    }
  }
}
