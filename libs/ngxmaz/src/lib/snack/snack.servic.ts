import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

import {SnackComponent} from "./snack.component";
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
  constructor(private snackBar: MatSnackBar) {
  }

  public duration = 3000;

  public success(message: string) {
    return this.show({data: message, panelClass: 'alert-success'});
  }

  public warning(message: string) {
    return this.show({data: message, panelClass: 'alert-warning'});

  }

  public danger(message: string) {
    return this.show({data: message, panelClass: 'alert-danger'});
  }

  public message(msg: string, suc: boolean) {
    suc ? this.success(msg) : this.danger(msg);
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
    });
  }
}
