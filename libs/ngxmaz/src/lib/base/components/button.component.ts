import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-button',
  template: `<a mat-button color="primary" (click)="onAction()">{{text}}</a>`
})
export class ButtonComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  @Input() text = '编辑';
  @Input() path = 'edit';
  @Input() params = {};

  onAction() {
    this.router.navigate([this.path], {
      relativeTo: this.route,
      queryParams: this.params,
    });
  }
}
