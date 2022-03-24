import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  template: `
    <mat-list>
      <mat-list-item>
        <img matListAvatar [src]="avatar" [alt]="avatar">
        <h3 matLine>{{title}}</h3>
        <p matLine>
          <ng-content></ng-content>
        </p>
      </mat-list-item>
    </mat-list>
  `,
})
export class CardComponent {
  @Input() avatar = '';
  @Input() title = '';
}
