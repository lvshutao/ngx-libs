import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder} from "@angular/forms";

import {AppHttpService} from "@fsl/ngxbase";

import {LibSnackService} from "../snack/snack.servic";
import {LocationService} from "../base/service/location.service";

export interface EditPageConfig {
  /**
   * api 路径
   */
  path: string;
  /**
   * 赋值参数
   * @param q
   */
  queryParam: (q: ParamMap) => [boolean, any];
  /**
   * 查询到数据后，更新模型的值
   * @param rst
   */
  patchMo: (rst: any) => void;

  postValue: () => any;
}

@Component({
  template: ``
})
export class AbstractEditPageComponent<T> implements OnInit {
  public isSave = false;
  public isLoading = false;

  protected config(): EditPageConfig {
    return {
      path: '', queryParam: q => {
        console.warn('you should set queryParam function', q)
        return [true, {}]
      },
      patchMo: rst => {
        console.warn('you should set pathMo function', rst)
      },
      postValue: () => {
        console.warn('you should set postValue function')
        return {}
      }
    }
  }

  constructor(
    protected http: AppHttpService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected showSer: LibSnackService,
    protected location: LocationService,
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      const r = this.config().queryParam(q)
      if (r[0]) {
        this.isSave = true;
        this.http.getWith<T>(this.config().path, r[1]).subscribe(rst => this.config().patchMo(rst));
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.http.save(this.isSave, this.config().path, this.config().postValue).subscribe(() => {
      this.showSer.success('提交成功');
      this.location.back();
    }).add(() => {
      this.isLoading = false;
    })
  }

}
