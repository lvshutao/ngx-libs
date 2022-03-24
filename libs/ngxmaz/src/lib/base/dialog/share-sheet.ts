import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

import {SvgName} from '@fsl/ngxbase'

export interface ShareSheetData {
  title?: string;
  desc?: string;
  items: ShareSheetItem[];
}

export interface ShareSheetItem {
  icon?: string;
  svg?: SvgName;
  text: string;
  name?: string;
}

@Component({
  template: `<h3>{{data.title || '请选择'}}</h3>
  <div *ngIf="data.desc" class="placeholder">{{data.desc}}</div>
  <div class="mb10"></div>
  <div style="overflow: hidden;" *ngIf="data && data.items">
    <div class="choice" *ngFor="let m of data.items" (click)="choice(m)">
      <div class="center-vh">
        <mat-icon *ngIf="m.icon">{{m.icon}}</mat-icon>
        <lib-svg *ngIf="m.svg" [name]="m.svg"></lib-svg>
      </div>
      <div>{{m.text}}</div>
    </div>
  </div>
  `,
  styles: [`.choice {
    border: 1px solid grey;
    border-radius: 5px;
    float: left;
    width: 60px;
    height: 60px;
    text-align: center;
    margin: 0 16px 16px 0;
  }

  .center-vh {
    height: 40px;
  }
  `]
})
export class DialogShareSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ShareSheetData,
    private sheetRef: MatBottomSheetRef<DialogShareSheetComponent>
  ) {
  }

  choice(e: ShareSheetItem) {
    this.sheetRef.dismiss(e.name || e.icon || e.svg);
  }
}
