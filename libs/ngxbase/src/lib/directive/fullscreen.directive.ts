import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

import screenfull from 'screenfull';


@Directive({
  selector: '[fullscreen]'
})
export class FullscreenDirective implements OnChanges {
  @Input('fullscreen') disabled: boolean = true;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    if (!this.disabled && screenfull.isEnabled) {
      screenfull.request(this.el.nativeElement);
    } else if (screenfull.isEnabled) {
      screenfull.exit();
    }
  }
}
