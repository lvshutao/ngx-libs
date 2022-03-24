import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AlterService {
  danger(msg: string) {
    alert(msg)
  }
}
