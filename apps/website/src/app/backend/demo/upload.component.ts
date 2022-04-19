import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  template: `
    <table class="lib-table">
      <tr>
        <th width="200">组件</th>
        <th width="150">使用场景</th>
        <th>示例</th>
      </tr>
      <tr>
        <td>lib-upload-avatar</td>
        <td>头像</td>
        <td>
          <lib-upload-avatar [src]="mo.get('avatar')!.value"
                             (action)="mo.patchValue({avatar:$event})"></lib-upload-avatar>
        </td>
      </tr>
      <tr>
        <td>lib-upload-hide</td>
        <td>自定义上传元素</td>
        <td>
          <div>示例：使用 label 来触发上传事件</div>
          <label for="file-one">头像选择</label>
          <lib-upload-hide idName="file-one" (action)="mo.patchValue({avatar:$event})"></lib-upload-hide>
        </td>
      </tr>

      <tr>
        <td>lib-upload-trigger</td>
        <td>通过属性触发上传事件</td>
        <td><a mat-button (click)="show = !show">触发</a>
          <lib-upload-trigger [trigger]="show" (action)="triggerRst = $event"></lib-upload-trigger>
          <div>触发结果:{{triggerRst |json}}</div>
        </td>
      </tr>

      <tr>
        <td>lib-upload-wrap</td>
        <td>相当于 label + lib-upload-hide</td>
        <td>
          <lib-upload-wrap (action)="mo.patchValue({avatar:$event})">
            <a mat-stroked-button>
              <mat-icon>image</mat-icon>
              图片选择</a>
          </lib-upload-wrap>
        </td>
      </tr>

      <tr>
        <td>lib-upload-one <br>
          lib-upload-form-one
        </td>
        <td>上传一张图片</td>
        <td>
          <lib-upload-one (action)="mo.patchValue({avatar:$event})"></lib-upload-one>
          <lib-upload-form-one [form]="mo"></lib-upload-form-one>
        </td>
      </tr>


      <tr>
        <td>lib-form-image</td>
        <td>Form 图片</td>
        <td>
          <lib-form-image [form]="mo" name="avatar" label="图片选择"></lib-form-image>
        </td>
      </tr>

      <tr>
        <td>lib-form-images <br>
          lib-form-images-action(lib-images)
        </td>
        <td>Form 图片数组 <br>
          (注：不能跟 lib-upload-trigger 一起使用)
        </td>
        <td>
          <lib-form-images [form]="mo" name="images"></lib-form-images>
          <lib-form-images-action [form]="mo" name="images"></lib-form-images-action>
        </td>
      </tr>

      <tr>
        <td>lib-uploadmaz-file</td>
        <td>此组件不能单独使用</td>
        <td>
        </td>
      </tr>

      <tr>
        <td>lib-uploadmaz-list</td>
        <td>预览+全部上传+取消上传+全部移除</td>
        <td>
          <lib-uploadmaz-list (whenUpload)="onPrint('upload',$event)"
                              (whenRemove)="onPrint('remove',$event)"
                              (whenFinish)="onPrint('finish',$event)"></lib-uploadmaz-list>
        </td>
      </tr>

      <tr>
        <td>lib-uploadmaz-button</td>
        <td>批量上传对话框 <br>
          (注：不能跟 lib-form-images 一起使用，否则可能无法使用预览)
        </td>
        <td>
          <lib-uploadmaz-button (whenSuccess)="onPrint('dialog',$event)"></lib-uploadmaz-button>
        </td>
      </tr>
    </table>


    <h3 class="ptb10">结果</h3>
    <div>{{mo.value | json}}</div>
  `
})
export class DemoUploadComponent {
  mo = this.fb.group({
    avatar: [''],
    cover: [''],
    images: [[
      "http://assets.emm365.com/Fnrb49gFZVhV0jZ-QsoywQh0bUel",
      "http://assets.emm365.com/FrELnQNpb3J1sx6nV5TAOiyz2AZ8"
    ]]
  })

  show = false;
  triggerRst: any = null;

  constructor(
    private fb: FormBuilder
  ) {
  }

  onPrint(name: string, data: any) {
    console.log(name, ':', data)
  }
}
