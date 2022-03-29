import {Injectable} from "@angular/core";
import {Location} from "@angular/common";

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(
    public location: Location,
  ) {
  }

  back() {
    this.location.back();
  }
}
