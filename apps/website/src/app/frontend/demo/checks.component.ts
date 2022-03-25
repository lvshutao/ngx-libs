import {Component} from "@angular/core";
import {LibDialogService} from "@fsl/ngxmaz";

@Component({
  selector: 'fsl-checks',
  template: `
    <h3>布局显示</h3>
    <ul class="checks">
      <li><a mat-button routerLink="/">layout</a> ：左侧边栏 + 右侧边栏 + 正文(长内容)</li>
      <li><a mat-button routerLink="/layout2">layout2</a> ：左侧边栏 + 右侧边栏 + 正文(短内容)</li>
      <li><a mat-button routerLink="/sidenav1">layout-Sidenav 1</a> 左菜单 + 正文(长内容)</li>
      <li><a mat-button routerLink="/sidenav2">layout-Sidenav 2</a> 左菜单 + 正文(短内容)</li>
    </ul>
    <h3>其它功能</h3>
    <ul class="checks">
      <li>
        <a (click)="confirm()" mat-button>确认框示例</a>
      </li>
    </ul>
  `,
  styles: [`
    .checks li {
      padding-bottom: 5px;
    }
  `]
})
export class ChecksComponent {
  constructor(private dialogSer: LibDialogService) {
  }

  confirm() {
    this.dialogSer.confirm({content: '确定要删除吗?'}).subscribe(yes => {
      console.log('confirm?', yes);
    })
  }
}
