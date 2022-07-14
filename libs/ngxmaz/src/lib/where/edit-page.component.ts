import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";

import {LibWhereService} from "./where.service";
import {FormGroup} from "@angular/forms";
import {MyAssets, MyTypecast} from "my-tsbase";

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

export function quickEditPageConfig(path: string, mo: FormGroup, name: string, isInt: boolean): EditPageConfig {
  return {
    path,
    queryParam: q => {
      const data = q.get(name);
      return [
        isInt ? MyTypecast.str2Number(data) > 0 : !MyAssets.isEmpty(data),
        {[name]: data}
      ]
    },
    postValue: () => {
      return mo.value;
    },
    patchMo: rst => {
      mo.patchValue(rst);
    }
  }
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
    protected ws: LibWhereService,
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      const r = this.config().queryParam(q)
      if (r[0]) {
        this.isSave = true;
        this.ws.http.getWith<T>(this.config().path, r[1]).subscribe(rst => this.config().patchMo(rst));
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.ws.http.save(this.isSave, this.config().path, this.config().postValue()).subscribe(() => {
      this.ws.showSer.success('提交成功');
      this.ws.location.back();
    }).add(() => {
      this.isLoading = false;
    })
  }

}
