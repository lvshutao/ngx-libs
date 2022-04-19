import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {AlterService} from "@fsl/ngxbase";
import {UploadEngine} from '@fsl/ngxupload';

import {TinymceService} from "../service/tinymce.service";


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

  constructor(private engine: UploadEngine, private showSer: AlterService) {
    this.editor = new TinymceService(this.engine);
  }

  get editConfig() {
    return this.height > 0 ?
      this.editor.config({min_height: this.height}) : this.editor.initEditor;
  }

  ngOnInit() {
    this.engine.onInit();
  }
}
