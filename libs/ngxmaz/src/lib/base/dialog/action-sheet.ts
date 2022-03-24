import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

export interface ActionSheetData {
  icon?: string;
  class: string; // 样式
  name: string;
  text: string;
}

@Component({
  template: `
    <mat-nav-list>
      <mat-list-item role="listitem" *ngFor="let ele of data" (click)="choice(ele.name)" [ngClass]="ele.class">
        <mat-icon *ngIf="ele.icon" matListIcon>{{ele.icon}}</mat-icon>
        <div matline>{{ele.text}}</div>
      </mat-list-item>
    </mat-nav-list>`
})
export class DialogActionSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ActionSheetData[] = [],
    private sheetRef: MatBottomSheetRef<DialogActionSheetComponent>
  ) {
  }

  choice(name: string) {
    this.sheetRef.dismiss(name);
  }
}
