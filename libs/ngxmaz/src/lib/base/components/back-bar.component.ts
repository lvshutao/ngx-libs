import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-back-bar',
  template: `
    <lib-bar>
      <button mat-icon-button (click)="back()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <ng-content></ng-content>
    </lib-bar>
  `,
})
export class BackBarComponent implements OnInit {
  @Input() url = '';
  @Input() path = '';
  @Output() action = new EventEmitter();
  canBack = false;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.canBack) {
      this.canBack = document.referrer.length > 5;
    }
  }

  back() {
    this.action.emit();
    if (this.path) {
      this.router.navigate([this.path], {
        relativeTo: this.route,
      });
    } else if (this.url) {
      this.router.navigateByUrl(this.url);
    } else {
      this.location.back();
    }
  }
}

@Component({
  selector: 'lib-back-bar-submit',
  template: `
    <lib-back-bar>
      <span>{{isSave ? '更新' : '添加'}}{{label}}</span>
      <lib-hspace></lib-hspace>
      <a mat-button (click)="action.emit()" [disabled]="disabled">{{text}}</a>
    </lib-back-bar>`
})
export class BackBarSubmitComponent {
  @Input() isSave = false;
  @Input() label = '';
  @Input() disabled = false;
  @Input() text = '提交';

  @Output() action = new EventEmitter();
}
