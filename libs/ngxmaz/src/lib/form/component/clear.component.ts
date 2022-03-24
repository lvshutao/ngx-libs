import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

// 清除 FormGroup/AbstractController,注意添加 matSuffix (S大写)
@Component({
  selector: 'lib-clear',
  template: `
    <a mat-icon-button aria-label="Clear" (click)="clear()">
      <mat-icon>close</mat-icon>
    </a>`,
})
export class ClearComponent {

  @Input() form!: FormGroup | AbstractControl;
  @Input() name: string = '';

  clear() {
    if (this.name) {
      this.form.patchValue({[this.name]: ''});
    }
  }
}
