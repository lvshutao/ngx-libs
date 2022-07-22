import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {MyTypecast} from "my-tsbase";

import {NgFormArrayService} from "@fsl/ngxbase";
import {UploadSrcData} from "@fsl/ngxupload";
import {LibDialogService} from '@fsl/ngxmaz'

import {MazMediaEditDialog} from "./media.dialg";

@Component({
  selector: 'lib-form-medias',
  template: `
    <div *ngIf="form && nfa" [formGroup]="form">
      <div [formArrayName]="name">
        <!-- 布局显示 -->
        <div class="">
          <a mat-icon-button [class.layout]="layout === 'list'" (click)="layout='list'">
            <mat-icon>view_list</mat-icon>
          </a>
          <a mat-icon-button [class.layout]="isModule" (click)="layout='module'">
            <mat-icon>view_module</mat-icon>
          </a>
        </div>
        <!-- 布局显示 -->
        <div *ngIf="nfa.length() > 0">
          <div class="module" *ngFor="let c of nfa.controllers;let i = index;"
               [ngClass]="{'img-block-inline':isModule}">
            <div class="row" [formGroup]="nfa.toFormGroup(c)"> <!-- 或者使用 formGroup=c -->
              <div class="img-block">
                <div style="height: 100%;" *ngIf="nfa.getItemKey(i,'src')">
                  <lib-image [src]="nfa.getItemKey(i,'src')"></lib-image>
                  <!--              <img style="width: 100%;" [src]="nfa.getItemKey(i,'src')">-->
                </div>
                <div class="img-actions">
                  <a mat-icon-button (click)="bindInfo(i)" *ngIf="isModule">
                    <mat-icon>info</mat-icon>
                  </a>
                  <a mat-icon-button (click)="bindUpload(i);">
                    <mat-icon>cloud_upload</mat-icon>
                  </a>
                  <a mat-icon-button [disabled]="nfa.disUpward(i)" (click)="nfa.upward(i)">
                    <mat-icon>arrow_upward</mat-icon>
                  </a>
                  <a mat-icon-button [disabled]="nfa.disDownward(i)" (click)="nfa.downward(i)">
                    <mat-icon>arrow_downward</mat-icon>
                  </a>
                  <a mat-icon-button *ngIf="c.get('status')!.value !== 'delete'" (click)="bindDelete(i)">
                    <mat-icon>delete</mat-icon>
                  </a>
                  <a mat-icon-button *ngIf="c.get('status')!.value === 'delete'" (click)="bindUndo(i)">
                    <mat-icon>undo</mat-icon>
                  </a>
                </div>
              </div>
              <div class="flex1 pl20" *ngIf="layout === 'list'">
                <mat-form-field floatLabel="always">
                  <input matInput formControlName="title" placeholder="图片标题">
                  <lib-form-clear matSuffix [form]="c" name="title"></lib-form-clear>
                </mat-form-field>
                <!--            <div class="row">-->
                <!--              <div class="flex1">-->
                <!--              </div>-->
                <!--              <div style="width: 100px;">-->
                <!--                <div class="pt-checkbox"></div>-->
                <!--                <mat-checkbox (change)="bindFirstChange($event,i)" formControlName="first">封面</mat-checkbox>-->
                <!--              </div>-->
                <!--            </div>-->

                <mat-form-field floatLabel="always">
                  <textarea matInput formControlName="summary" placeholder="图片描述"></textarea>
                  <lib-form-clear matSuffix [form]="c" name="summary"></lib-form-clear>
                </mat-form-field>

              </div>
            </div>
          </div>
        </div>
        <!-- 内容显示 -->
      </div>

      <div class="right" style="padding-right: 8px;">
        <a mat-button (click)="bindSelectImage(true)">
          <mat-icon>collections</mat-icon>
          批量上传
        </a>
        <a mat-button (click)="bindSelectImage(false)">
          <mat-icon>image</mat-icon>
          单张上传
        </a>
        <a mat-button color="primary" (click)="nfa.insertItem()">
          添加记录
        </a>
      </div>
    </div>
    <lib-upload-trigger [trigger]="open"
                        (action)="onUploadDone($event)"></lib-upload-trigger>
  `,
  styles: [`
    .layout {
      color: #3f51b5;
    }

    .img-block {
      width: 200px;
      height: 130px;
      background: #efefef;
      position: relative;
    }

    .img-actions {
      position: absolute;
      bottom: 0;
      right: 0;
      background: rgba(1, 1, 1, 0.5);
      width: 100%;
      text-align: right;
      color: whitesmoke;
    }

    .img-block-inline {
      display: inline-block;
      vertical-align: middle;
    }

    .module {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  `]
})

export class MazFormMediasComponent {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Input() form: FormGroup;
  @Input() name = ArticleMediaKey;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Input() nfa: NgFormArrayService;

  @Input() event = false;

  @Output() whenDelete = new EventEmitter<number>();
  @Output() whenUpdate = new EventEmitter<any>(); // 修改内容之后如何更新？
  @Output() whenCreate = new EventEmitter<any>();

  multiple = false; // 允许多图上传
  open = false; // 打开上传对话框
  index = -1;
  layout = 'list';

  constructor(private dialogSer: LibDialogService) {
  }

  get isModule(): boolean {
    return this.layout === 'module';
  }

  bindInfo(index: number) {
    // 对话框
  }

  bindUpload(index: number) {
    this.index = index;
    this.open = !this.open;
  }

  bindDelete(i: number) {
    this.dialogSer.confirm({content: '确定要删除此图片吗?'}).subscribe((yes: boolean) => {
      if (yes) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const id = MyTypecast.str2Number(this.nfa.getItem(i).get('id').value);
        if (id > 0) { // 标记为删除
          if (this.event) {
            this.whenDelete.emit(i);
          } else {
            this.nfa.updateItemKey(i, 'status', 'delete');
          }
        } else {
          this.nfa.removeItem(i);
        }
      }
    });
  }

  bindUndo(i: number) {
    this.nfa.updateItemKey(i, 'status', 'active');
  }

  bindSelectImage(multiple: boolean) {
    this.multiple = multiple;
    this.index = -1;
    this.open = !this.open;
  }

  // bindFirstChange(e: MatCheckboxChange, i: number) {
  //   if (e.checked) {
  //     this.nfa.resetItemsKey('first', false);
  //     this.nfa.updateItemKey(i, 'first', true);
  //   }
  // }

  onUploadDone(data: UploadSrcData) {
    if (this.index == -1) {
      this.nfa.insertItem();
      const lastIndex = this.nfa.length() - 1;
      this.nfa.updateItemKey(lastIndex, 'src', data.src);
      if (this.event) {
        this.whenCreate.emit(this.nfa.getItem(lastIndex).value);
      }
    } else {
      this.nfa.updateItemKey(this.index, 'src', data.src);
      if (this.event) {
        this.whenUpdate.emit(this.nfa.getItem(this.index).value);
      }
    }
  }

  handleInfo(i: number) {
    this.dialogSer.open(MazMediaEditDialog, {
      data: this.nfa.getItem(i).value,
    }).afterClosed().subscribe(data => {
      if (data) {
        this.nfa.patchItem(i, data);
        if (this.event) {
          this.whenUpdate.emit(data);
        }
      }
    });
  }
}

export const ArticleMediaKey = 'medias';
export const ArticleMediaConfig = {
  id: [0],
  article_id: [0],
  status: ['active'],
  kind: ['image'],
  first: [false],
  title: [''],
  summary: [''],
  src: [''],
  sort_id: [0]
};

/*
export const BsArticleFormConfig = {
  ....
  [ArticleMediaKey]: new FormArray([]),
};

form = this.fb.group(BsArticleFormConfig);
nfa: NgFormArrayObjSer;


constructor(
  private fb: FormBuilder,
) {
  this.nfa = new NgFormArrayObjSer(this.fb);
  this.nfa.bind(this.form, ArticleMediaKey, () => {
    return ArticleMediaConfig;
  });
}
 */
