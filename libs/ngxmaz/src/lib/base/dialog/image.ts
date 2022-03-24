import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  template: `<lib-image-viewer [src]="images"></lib-image-viewer>
  `
})
export class DialogImageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public src: string,
  ) {
  }

  get images() {
    return [this.src]
  }
}
