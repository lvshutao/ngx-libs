import {Component, Inject, InjectionToken, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {UploadEngine} from '@fsl/ngxupload';

import {TinymceService} from "../service/tinymce.service";

export const EDITOR_CONFIG = new InjectionToken('lib.editor');

@Component({
  selector: 'lib-editor',
  template: `
    <div *ngIf="form" [formGroup]="form">
      <editor [init]="editConfig"
              [formControlName]="name"></editor>
    </div>`
})
export class LibEditorComponent implements OnInit {
  @Input() form: FormGroup | undefined;
  @Input() name = 'content';
  @Input() height = 0; // 默认 600

  public readonly editor: TinymceService;

  constructor(
    private ue: UploadEngine,
    @Inject(EDITOR_CONFIG) public config: any = {},
  ) {
    this.editor = new TinymceService(this.ue);
  }

  get editConfig() {
    return this.editor.mergeConfig(Object.assign({}, this.config, {min_height: this.height || 600}));
  }

  ngOnInit() {
    this.ue.onInit();
  }
}
