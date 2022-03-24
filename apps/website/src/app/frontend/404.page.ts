import {Component} from "@angular/core";
import {Location} from '@angular/common';

@Component({
  template:`<div class="center center-vh column" style="height: 50vh;">
    <h4>对不起，找不到指定页面</h4>
    <div>
      <a mat-button (click)="bindBack()">
        <mat-icon>arrow_back</mat-icon>
        返回
      </a>
    </div>
  </div>`
})
export class NotFound404Page {
  constructor(private location: Location) {
  }

  bindBack() {
    this.location.back();
  }
}
