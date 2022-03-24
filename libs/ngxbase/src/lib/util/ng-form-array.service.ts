import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";

/**
 * @example
 * 1. in your ts file
 * m = this.fb.group({
 *   marches: this.fb.array([]),
 * });
 *
 * public nfa: NgFormArrayObjSer;
 * name = 'marches';
 *
 * constructor(private fb: FormBuilder) {
 *   this.nfa = new NgFormArrayObjSer(this.fb);
 * }
 *
 * ngOnInit(): void {
 *   this.nfa.bind(this.m, this.name, () => {
 *     return {
 *       subject: ['', [Validators.required]],
 *     };
 *   });
 *   // 常见错误
 *   // 1. api 返回的 marches 的值为 null 而不是 []
 * }
 *
 * // html 模板
 *
 * <div>
 *   <div class="row">
 *     <h3 class="flex pt8">您的标题</h3>
 *     <div class="flex1">
 *       <a mat-icon-button (click)="nfa.insertItem()">
 *         <mat-icon>add_circle_outline</mat-icon>
 *       </a>
 *     </div>
 *   </div>
 *   <div [formArrayName]="name">
 *     <div *ngFor="let c of nfa.controllers; let i = index;">
 *       <div [formGroup]="c" class="row">
 *         <div class="flex1">
 *           <lib-row-title4 label="主题">
 *             <mat-form-field floatLabel="never">
 *               <input matInput formControlName="subject" placeholder="请填写行程主题">
 *             </mat-form-field>
 *           </lib-row-title4>
 *         </div>
 *         <div style="width: 80px" class="flex pt8">
 *           <a mat-icon-button *ngIf="nfa.hasMore"
 *              color="warn" (click)="nfa.removeItem(i)">
 *             <mat-icon>remove_circle_outline</mat-icon>
 *           </a>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 */
export class NgFormArrayObjSer {

  private form!: FormGroup;
  private name!: string;
  private itemFunc!: () => any;
  private cache!: FormArray;

  constructor(public fb: FormBuilder) {
  }

  bind(form: FormGroup, name: string, itemFunc?: () => any) {
    this.form = form;
    this.name = name;
    if (itemFunc) {
      this.itemFunc = itemFunc;
    }
    return this;
  }

  value(): any[] {
    // @ts-ignore
    return this.form.get(this.name).value || [];
  }

  insertItem() {
    if (this.itemFunc == null || typeof this.itemFunc !== 'function') {
      console.warn('your itemFunc is Empty');
      return;
    }
    this.insertWith(this.itemFunc());
  }

  insertWith(item: any) {
    this.getItems().push(this.fb.group(item));
  }

  getItems(): FormArray {
    return this.form.get(this.name) as FormArray;
  }

  length(): number {
    return (this.form.get(this.name) as FormArray).length;
  }

  // 清空
  clear(): void {
    // this.form.patchValue({[this.name]: this.fb.array([])});
    this.form.setControl(this.name, this.fb.array([]));
  }

  // 缓存
  stashing(): void {
    this.cache = this.getItems();
    this.clear();
  }

  // 恢复缓存
  recover(): void {
    if (this.cache) {
      this.form.setControl(this.name, this.cache);
    } else if (this.length() < 1) {
      this.insertItem();
    }
  }

  // 如果要重置，可以直接使用 this.m.patchValue({[this.key]:items});
  addItems(items: any[]) {
    if (!!items) {
      items.forEach(e => {
        this.getItems().push(this.fb.group(e));
      });
    }
  }

  push(item: any) {
    this.getItems().push(this.fb.group(item));
  }

  removeItem(index: number) {
    return this.getItems().removeAt(index);
  }

  // 用在 html 模板中
  // <div *ngFor="let m of moreControllers; let i = index;">
  get controllers() {
    return this.getItems().controls;
  }

  toFormGroup(c: FormGroup | AbstractControl): FormGroup {
    return c as FormGroup;
  }

  resetItemsKey(keyName: string, value: any) {
    this.getItems().controls.forEach(c => {
      c.patchValue({[keyName]: value});
    });
  }


  updateItem(index: number, e: any) {
    this.getItems().at(index).patchValue(e);
  }

  updateItemKey(index: number, keyName: string, value: any) {
    const a = {};
    // @ts-ignore
    a[keyName] = value;
    this.getItems().at(index).patchValue(a);
  }

  patchItem(index: number, patch: any) {
    this.getItem(index).patchValue(patch);
  }

  getItemKey(index: number, keyName: string) {
    // @ts-ignore
    return this.getItems().at(index).get(keyName).value;
  }

  getItem(index: number) {
    return this.getItems().at(index);
  }

  // 排序按钮
  get hasMore() {
    return this.getItems().length > 1;
  }

  // 是否无法向上
  disUpward(i: number) {
    return i == 0 || this.getItems().length < 2;
  }

  // 是否无法向下
  disDownward(i: number) {
    const l = this.getItems().length;
    return l < 2 || i == l - 1;
  }

  upward(i: number) {
    const cc = this.getItems();
    const item = cc.at(i - 1);
    cc.removeAt(i - 1);
    cc.insert(i, item);
  }

  downward(i: number) {
    const cc = this.getItems();
    const item = cc.at(i);
    cc.removeAt(i);
    cc.insert(i + 1, item);
  }
}
