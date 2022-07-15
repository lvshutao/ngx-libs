import {Component, Input} from "@angular/core";
import {NgFormArrayService} from "@fsl/ngxbase";

@Component({
  selector: 'lib-form-array-action',
  template: `
      <a mat-icon-button (click)="ser.upward(index)" [disabled]="ser.disUpward(index)">
        <mat-icon>arrow_upward</mat-icon>
      </a>
      <a mat-icon-button (click)="ser.downward(index)" [disabled]="ser.disDownward(index)">
        <mat-icon>arrow_downward</mat-icon>
      </a>
      <a mat-icon-button color="warn" (click)="ser.removeItem(index)">
        <mat-icon>remove_circle_outline</mat-icon>
      </a>`,
  styles: [`:host {
    width: 120px;
  }`]
})
export class LibFormArrayActionComponent {
  @Input() ser!: NgFormArrayService;
  @Input() index!: number;
}
