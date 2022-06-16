import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

import {SnackComponent} from "./snack.component";
import {ToastrService} from "ngx-toastr";

/*
add the css in the styles.css, copy from Alerts * Bootstrap
.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}
.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
}
.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
 */


@Injectable()
export class LibSnackService {
  constructor(public snackBar: MatSnackBar, public toastr: ToastrService) {
  }

  public duration = 3000;

  public success(message: string, duration?: number) {
    return this.show({data: message, panelClass: 'alert-success', duration});
  }

  public warning(message: string, title?: string) {
    return this.show({data: message, panelClass: 'alert-warning', duration: this.duration});
    // this.toastr.warning(message, title, {
    //   closeButton: true, tapToDismiss: true, newestOnTop: true,
    //   timeOut: 0,
    // })
  }

  public danger(message: string, title?: string) {
    this.toastr.error(message, title, {
      closeButton: true, tapToDismiss: true, newestOnTop: true,
      positionClass: 'toast-bottom-center',
      timeOut: 0,
    })
    // return this.snackBar.open(message,'关闭').afterDismissed()
  }

  public message(msg: string, success: boolean, duration?: number) {
    success ? this.success(msg, duration) : this.danger(msg);
  }

  public show(config: {
    data: any;
    panelClass: string;
    duration?: number;
  }) {
    return this.snackBar.openFromComponent(SnackComponent, {
      data: config.data,
      duration: config.duration || this.duration,
      panelClass: [config.panelClass, 'show-message'],
      horizontalPosition: 'center',
    }).afterDismissed();
  }
}
