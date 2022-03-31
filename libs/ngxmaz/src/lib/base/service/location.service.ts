import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(
    public location: Location,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }

  back() {
    this.location.back();
  }

  queryParam(observer: (q: ParamMap) => void) {
    this.route.queryParamMap.subscribe(observer)
  }

  navigate(commands: any[], queryParams: any = {}): Promise<boolean> {
    return this.router.navigate(commands, {
        relativeTo: this.route,
        queryParams
      }
    )
  }
}
