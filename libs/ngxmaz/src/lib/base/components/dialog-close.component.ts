import {Component, Input} from "@angular/core";

@Component({
  selector: 'lib-dialog-close',
  template: `
    <div mat-dialog-actions align="end">
      <a mat-button autofocus mat-dialog-close>{{cancelText}}</a>
      <ng-content></ng-content>
    </div>`
})
export class DialogCloseBarComponent {
  @Input() cancelText = '关闭';
}

/*
<h2 mat-dialog-title>Install Angular</h2>
<mat-dialog-content class="mat-typography">

</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Install</button>
</mat-dialog-actions>
 */
