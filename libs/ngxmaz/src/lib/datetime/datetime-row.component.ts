import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'lib-datetime-row',
  template: `
      <div class="row">
          <div style="width: 80px;line-height: 60px;" class="placeholder">{{label}}</div>
          <div class="flex1" style="position: relative;">
              <lib-datetime [initValue]="value" style="width: 300px;display: inline-block;"
                            (change)="change.emit($event)"></lib-datetime>
              <div class="hint-form-field" style="bottom: 0;position:absolute;" *ngIf="hint">{{hint}}</div>
          </div>
      </div>`
})
export class LibDatetimeRowComponent {
  @Input() label = '';
  @Input() hint = '';
  @Input() value: string | number = '';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<string>();
}
