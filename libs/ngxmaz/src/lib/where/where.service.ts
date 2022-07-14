import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

import {AppHttpService} from "@fsl/ngxbase";

import {LibDialogService} from "../base/dialog/dialog.service";
import {LocationService} from "../base/service/location.service";
import {LibSnackService} from "../snack/snack.servic";

// 注意 ActivateRoute 不能注入此服务
@Injectable({providedIn: 'root'})
export class LibWhereService {
  constructor(
    public http: AppHttpService,
    public router: Router,
    public dialogSer: LibDialogService,
    public showSer: LibSnackService,
    public fb: FormBuilder,
    public location: LocationService,
  ) {
  }
}
