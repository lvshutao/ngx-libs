import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-add-button',
  template: `
    <button [disabled]="disabled" mat-button color="primary" (click)="onclick()">
      <mat-icon>add</mat-icon>
      {{text}}</button>`
})
export class ButtonAddComponent {
  @Input() text = '添加';
  @Input() disabled = false;

  @Input() path = '';
  /**
   * 只有在设置了 path 后，params 才会生效
   */
  @Input() params = {};
  /**
   * path 为空时才会生效
   */
  @Output() action = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  onclick() {
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

@Component({
  selector: 'lib-circle-button',
  template: `<a mat-icon-button>
    <mat-icon>add_circle_outline</mat-icon>
  </a>`
})
export class CircleButtonComponent {

}
