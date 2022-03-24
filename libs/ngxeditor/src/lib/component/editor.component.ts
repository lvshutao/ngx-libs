import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

import {AlterService} from "@fsl/ngxbase";
import {UploadEngine, MyNgxUploadConfig, NewUploadEngine} from '@fsl/ngxupload';

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
  private readonly engine: UploadEngine;

  constructor(private conf: MyNgxUploadConfig, private http: HttpClient, private showSer: AlterService) {
    if (!this.conf.isQiniu) {
      console.error('Tinymce editor must use qiniu to upload');
    }
    this.engine = NewUploadEngine(
      Object.assign({}, conf, {isQiniu: true}),
      http,
    );
    this.editor = new TinymceService(this.engine);
  }

  get editConfig() {
    return this.height > 0 ?
      this.editor.config({min_height: this.height}) : this.editor.initEditor;
  }

  ngOnInit() {
    this.engine.onInit(msg => {
      this.showSer.danger(msg);
    });
  }
}
