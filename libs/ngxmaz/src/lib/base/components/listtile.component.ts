import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'lib-listtile',
  template: `
    <div class="rows" style="align-items: center;">
      <div class="flex1">
        <ng-content></ng-content>
      </div>
      <div style="width: 50px;text-align: right;">
        <button mat-icon-button (click)="action.emit()">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>`
})
export class ListtileComponent {
  @Output() action = new EventEmitter();
}
