import {Component, Inject} from '@angular/core';

import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


@Component({
  template: `
    <div style="text-align: center;">{{data}}</div>`,
  styles: [``]
})
export class SnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }
}
