import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'lib-listtile',
  template: `
    <div class="row" [ngClass]="alignClass">
      <div *ngIf="alignLeft" style="padding-top: 2px;">
        <img [src]="src" class="avatar40" style="margin-right: 10px;">
      </div>
      <div class="flex1">
        <div class="placeholder-title">{{title}}</div>
        <div class="placeholder">{{subtitle}}</div>
        <ng-content></ng-content>
      </div>

      <div *ngIf="!alignLeft" style="padding-top: 2px;">
        <img [src]="src" class="avatar40" style="margin-left: 10px;">
      </div>

      <div *ngIf="arrow" style="width: 40px;">
        <a mat-icon-button (click)="action.emit()">
          <mat-icon>chevron_right</mat-icon>
        </a>
      </div>
    </div>`
})
export class ListtileComponent {
  @Input() src = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() arrow = true;
  @Input() alignLeft = true;

  @Output() action = new EventEmitter();

  get alignClass(): string {
    return this.alignLeft ? 'left' : 'right';
  }
}
