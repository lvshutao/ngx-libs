import {Component} from "@angular/core";
import {MyBrowser} from "my-tsbase";
import {AppBaseConfig, AppHttpService} from "@fsl/ngxbase";

import {OauthSrc} from "../model";
import {MyAppxAuthPageConfig} from "../../authpage-config";
import {MyAppxApiConfig} from "../../api-config";
import {MyAppxRouteConfig} from "../../route-config";

@Component({
  selector: 'lib-auth-layout',
  template:`<div class="mat-card" style="text-align: center;max-width: 360px;margin: 0 auto;padding: 15px;margin-top: 60px;">
    <div class="left">
      <div>
        <ng-content></ng-content>
      </div>
      <div style="margin-top: 20px;"></div>
      <div class="placeholder center">其它登录方式</div>
      <div style="margin: 5px 0;">
          <span *ngIf="authConfig.google" title="Google 登录">
          <svg (click)="bindOauth3('google')" t="1597896906343" style="width: 30px;height: 30px;" class="icon lib-svg"
               viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="2153">
            <path
              d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512"
              fill="#FBBC05" p-id="2154"></path>
            <path
              d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88"
              fill="#EA4335" p-id="2155"></path>
            <path
              d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776"
              fill="#34A853" p-id="2156"></path>
            <path
              d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667"
              fill="#4285F4" p-id="2157"></path>
          </svg>
            </span>
        <span *ngIf="authConfig.wechat" title="微信登录">
          <svg (click)="bindOauth3('wechat')" t="1597897063799" class="icon lib-svg" viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="3099">
            <path
              d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141C959.756315 772.203049 772.692466 959.266898 544.059897 959.266898z"
              fill="#2DC100" p-id="3100"></path>
            <path
              d="M618.871102 424.812069c-52.6789 2.760395-98.49572 18.754507-135.696546 54.89766-37.587854 36.50356-54.743053 81.262707-50.047514 136.728622-20.586238-2.580191-39.34177-5.366183-58.19969-6.965492-6.552866-0.516038-14.292415 0.258019-19.786584 3.353224-18.316285 10.318716-35.858512 22.030941-56.703793 35.085479 3.818068-17.284208 6.294847-32.505287 10.680148-47.029101 3.173021-10.732366 1.702721-16.691379-8.152175-23.65687-63.256659-44.73355-89.905323-111.652647-69.963108-180.584703 18.470891-63.720479 63.798295-102.417201 125.376806-122.539619 84.100917-27.500536 178.52055 0.567232 229.651335 67.409538 18.733006 24.012159 30.112467 52.935895 32.763306 83.275665L618.871102 424.812069zM737.231222 753.7854c-16.691379-7.429312-31.989249-18.574304-48.241381-20.302622-16.252132-1.702721-33.330539 7.687331-50.305534 9.416673-51.724639 5.288368-98.0319-9.132033-136.263778-44.526725-72.646712-67.331723-62.275777-170.522981 21.799542-225.730878 74.736462-49.015438 184.324956-32.659894 237.003856 35.342474 45.971427 59.386373 40.55405 138.198922-15.55589 188.066232-16.252132 14.447022-22.108756 26.313853-11.686627 45.32638 1.909546 3.508855 2.140944 7.94535 3.250836 12.382869L737.231222 753.7854zM376.397651 403.348361c0.516038-12.640888-10.422129-23.991681-23.373254-24.353112-13.025869-0.533444-24.017278 9.593805-24.550722 22.619674-0.003072 0.078839-0.006143 0.158702-0.008191 0.237542-0.512967 12.869215 9.503704 23.719327 22.372918 24.232294 0.238565 0.009215 0.477131 0.015358 0.715696 0.017406C364.663926 426.584415 375.730078 416.448974 376.397651 403.348361zM502.909946 378.995249c-13.00232 0.258019-23.991681 11.350793-23.733662 23.99168 0.280545 13.104708 11.131681 23.50124 24.23639 23.220696 0.038908-0.001024 0.077815-0.002048 0.116723-0.003072 12.865119 0.104436 23.379398-10.239877 23.483834-23.104996 0.002048-0.278497 0-0.556994-0.008192-0.835491-0.109556-12.96546-10.708817-23.386565-23.673252-23.277009C503.191515 378.989105 503.050218 378.991153 502.909946 378.995249zM547.334283 569.640648c10.628954 0 19.348361-8.332379 19.760986-18.832323 0.384981-10.920761-8.15627-20.086582-19.077031-20.471563-0.176108-0.006143-0.352217-0.010239-0.529349-0.011262-11.041579 0.069624-19.937095 9.076743-19.867471 20.118322 0.001024 0.08703 0.002048 0.175084 0.003072 0.262115C528.092406 561.263219 536.764714 569.595597 547.334283 569.640648zM669.743869 530.351097c-10.452845 0.086006-19.011503 8.337498-19.477371 18.781128-0.570304 10.670933 7.617707 19.782488 18.28864 20.352793 0.310237 0.016382 0.620475 0.025597 0.930712 0.027645 10.654551 0 19.090342-8.07436 19.47737-18.703314 0.528325-10.772298-7.776409-19.934023-18.548706-20.462348-0.223207-0.011263-0.447438-0.01843-0.670645-0.021501V530.351097z"
              fill="#FFFFFF" p-id="3101"></path>
          </svg>
            </span>
        <span *ngIf="authConfig.work" title="企业微信登录">
            <div (click)="bindOauth3('work')" style="display: inline-block;width: 32px;height: 32px" class="work"></div>
          </span>
      </div>
      <div class="hint-div">
        <p>未注册的手机号或邮箱地址，在验证后将自动登录</p>
        <p>点击登录/注册即代表同意<a [routerLink]="routeConfig.terms">《用户协议》</a>
        </p>
      </div>
    </div>
  </div>`,
  styles: [`
    .lib-svg {
      margin-right: 10px;
    }

    .work {
      background-image: url(data:image/png;base64,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);
      background-repeat: no-repeat;
      background-size: 32px;
    }

    .work:hover {
      cursor: pointer;
    }
  `]
})
export class AuthLayoutComponent {
  constructor(public http: AppHttpService,
              public config: AppBaseConfig,
              public apiConfig: MyAppxApiConfig,
              public routeConfig: MyAppxRouteConfig,
              public authConfig: MyAppxAuthPageConfig,
  ) {
  }

  bindOauth3(name: string) {
    switch (name) {
      case 'wechat':
        this.http.getWith<OauthSrc>(this.apiConfig.authWechat, {
          name: this.config.name,
          gzh: MyBrowser.isWeiXin(),
          return: true,
        }).subscribe(res => {
          if (res) {
            location.href = res.url;
          }
        });
        break;
      case 'google':
        alert('暂未实现');
        break;
      case 'work':
        this.http.getWith<OauthSrc>(this.apiConfig.authWxWork, {
          name: this.config.name,
          return: true,
        }).subscribe(res => {
          if (res) {
            location.href = res.url;
          }
        });
        break;
    }
  }
}