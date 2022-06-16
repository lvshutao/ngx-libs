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

  /**
   * 绑定表单
   * @param form {FormGroup}
   * @param name {string}
   * @param itemFunc
   */
  bind(form: FormGroup, name: string, itemFunc?: () => any) {
    this.form = form;
    this.name = name;
    if (itemFunc) {
      this.itemFunc = itemFunc;
    }
    return this;
  }

  /**
   * 返回项的值 form.get(name).value || [];
   */
  value(): any[] {
    // @ts-ignore
    return this.form.get(this.name)?.value || [];
  }

  /**
   * 使用构造回调函数来添加一个项
   */
  insertItem() {
    if (this.itemFunc == null || typeof this.itemFunc !== 'function') {
      console.warn('your itemFunc is Empty');
      return;
    }
    this.insertWith(this.itemFunc());
  }

  /**
   * 添加指定的 item
   * @param item
   */
  insertWith(item: any) {
    this.getItems().push(this.fb.group(item));
  }

  /**
   * 返回全部 items
   * @return {FormArray}
   */
  getItems(): FormArray {
    return this.form.get(this.name) as FormArray;
  }

  /**
   * 获取 items 的长度
   */
  length(): number {
    return (this.form.get(this.name) as FormArray).length;
  }

  /**
   * 清空 form.name
   */
  clear(): void {
    // this.form.patchValue({[this.name]: this.fb.array([])});
    this.form.setControl(this.name, this.fb.array([]));
  }

  /**
   * 缓存全部的 items ，并且清空 form
   */
  stashing(): void {
    this.cache = this.getItems();
    this.clear();
  }

  /**
   * 恢复缓存的 items 到 form 中
   */
  recover(): void {
    if (this.cache) {
      this.form.setControl(this.name, this.cache);
    } else if (this.length() < 1) {
      this.insertItem();
    }
  }

  /**
   * 添加多个 item
   * 如果要重置，可以直接使用 this.m.patchValue({[this.key]:items});
   * @param items
   */
  addItems(items: any[]) {
    if (items) {
      items.forEach(e => {
        this.getItems().push(this.fb.group(e));
      });
    }
  }

  /**
   * 追加一个 item
   * @param item
   */
  push(item: any) {
    this.getItems().push(this.fb.group(item));
  }

  /**
   * 移除指定位置的 item
   * @param index {number}
   */
  removeItem(index: number) {
    return this.getItems().removeAt(index);
  }

  /**
   * 用在 html 模板中
   * @example
   * <div *ngFor="let m of moreControllers; let i = index;">
   */
  get controllers() {
    return this.getItems().controls;
  }

  /**
   * 用在 html 模块中
   * @param c
   */
  toFormGroup(c: FormGroup | AbstractControl): FormGroup {
    return c as FormGroup;
  }

  /**
   * 重置全部 items 的属性值
   * @param keyName {string} 属性
   * @param value {Object} 值
   */
  resetItemsKey(keyName: string, value: any) {
    this.getItems().controls.forEach(c => {
      c.patchValue({[keyName]: value});
    });
  }

  /**
   * 更新指定位置的 item 值, 也可以使用 patchItem
   * @param index {number}
   * @param e {Object}
   */
  updateItem(index: number, e: any) {
    this.getItems().at(index).patchValue(e);
  }

  /**
   * 更新指定位置 item 的属性值
   * @param index {number}
   * @param keyName {string} 属性名
   * @param value {Object} 属性新值
   */
  updateItemKey(index: number, keyName: string, value: any) {
    const a = {};
    // @ts-ignore
    a[keyName] = value;
    this.getItems().at(index).patchValue(a);
  }

  /**
   * 更新指定位置的 item 值
   * @param index {number}
   * @param patch {Object} 新的值
   */
  patchItem(index: number, patch: any) {
    this.getItem(index).patchValue(patch);
  }

  /**
   * 获取指定位置的 item 的属性值
   * @param index {number}
   * @param keyName {string}
   */
  getItemKey(index: number, keyName: string) {
    // @ts-ignore
    return this.getItems().at(index).get(keyName).value;
  }

  /**
   * 获取指定位置的 item
   * @param index {number}
   */
  getItem(index: number) {
    return this.getItems().at(index);
  }

  /**
   * 操作按钮，比如排序
   * @return {boolean} 如果 items 多于1个，则返回 true
   */
  get hasMore() {
    return this.getItems().length > 1;
  }

  /**
   * 是否能够向上移动
   * @param i {number}
   */
  disUpward(i: number) {
    return i == 0 || this.getItems().length < 2;
  }

  /**
   * 是否能够向下移动
   * @param i {number}
   */
  disDownward(i: number) {
    const l = this.getItems().length;
    return l < 2 || i == l - 1;
  }

  /**
   * 向上移动到指定的位置
   * @param i {number}
   */
  upward(i: number) {
    const cc = this.getItems();
    const item = cc.at(i - 1);
    cc.removeAt(i - 1);
    cc.insert(i, item);
  }

  /**
   * 向下移动到指定的位置
   * @param i {number}
   */
  downward(i: number) {
    const cc = this.getItems();
    const item = cc.at(i);
    cc.removeAt(i);
    cc.insert(i + 1, item);
  }
}
