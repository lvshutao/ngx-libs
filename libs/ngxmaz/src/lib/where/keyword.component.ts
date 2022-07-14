import {Component, Input} from "@angular/core";

@Component({
  selector: 'lib-where-keyword',
  template: `
    <mat-form-field floatLabel="always" class="width100">
      <input matInput [(ngModel)]="where.keyword" [placeholder]="label">
      <a matSuffix mat-icon-button aria-label="Clear" (click)="where.keyword=''">
        <mat-icon>close</mat-icon>
      </a>
    </mat-form-field>`
})
export class LibWhereKeywordComponent {
  @Input() where: any;
  @Input() label = '关键字';
}
