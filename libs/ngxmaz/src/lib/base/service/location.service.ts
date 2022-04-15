import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(
    public location: Location,
  ) {
  }

  back() {
    this.location.back();
  }

  queryParam(route: ActivatedRoute, observer: (q: ParamMap) => void) {
    route.queryParamMap.subscribe(observer)
  }

}
