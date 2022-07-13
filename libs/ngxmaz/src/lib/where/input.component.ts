import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'lib-where-input',
  template: `
    <mat-form-field floatLabel="always" [ngClass]="class">
      <input matInput [placeholder]="label" [(ngModel)]="value" (ngModelChange)="action.emit($event)">
      <a matSuffix mat-icon-button aria-label="Clear" (click)="action.emit('')">
        <mat-icon>close</mat-icon>
      </a>
    </mat-form-field>`
})
export class LibWhereInputComponent {
  @Input() value = '';
  @Input() label = '';
  @Input() class = 'width150';

  @Output() action = new EventEmitter<string>();
}
