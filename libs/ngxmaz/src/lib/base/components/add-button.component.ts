import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-add-button',
  template: `
    <button [disabled]="disabled" mat-button color="primary" (click)="bindAdd()">
      <mat-icon>add</mat-icon>
      {{text}}</button>`
})
export class AddButtonComponent {
  @Input() text = '添加';
  @Input() params = {};
  @Input() disabled = false;
  @Input() path = '';

  @Output() action = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  bindAdd() {
    if (this.path) {
      this.router.navigate([this.path], {
        relativeTo: this.route,
        queryParams: this.params,
      });
    } else {
      this.action.emit();
    }
  }
}
