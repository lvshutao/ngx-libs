import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  template: `
    <div mat-dialog-title style="color: darkred;">{{data.title || '警告'}}</div>
    <div mat-dialog-content [innerHTML]="data.content"></div>
    <div mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close>确定</button>
    </div>
  `
})
export class DialogAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) {
  }
}
