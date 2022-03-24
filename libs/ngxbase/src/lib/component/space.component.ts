import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-hspace',
  template: `<span style="padding-right:10px;">&nbsp;</span>`,
})
export class LibHspaceComponent {
}

@Component({
  selector: 'lib-vspace',
  template: `
    <div style="clear: both;" [style.height.px]="height"></div>`,
})
export class LibVspaceComponent {
  @Input() height = 25;
}

@Component({
  selector: 'lib-vspace40',
  template: `
    <div style="clear: both;height: 40px;"></div>`,
})
export class LibVspace40Component {
}
