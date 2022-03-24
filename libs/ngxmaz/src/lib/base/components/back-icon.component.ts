import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'lib-back-icon',
  template: `
    <button mat-button (click)="goBack()">
      <mat-icon>arrow_back</mat-icon>
    </button>`
})
export class BackIconComponent {
  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
