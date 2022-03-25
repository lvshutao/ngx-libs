import {Component, OnDestroy} from "@angular/core";
import {MediaResponsiveService} from "../service/media-responsive.service";

@Component({template: ``, providers: [MediaResponsiveService]})
export class MediaResponsiveComponent implements OnDestroy {
  constructor(
    public media: MediaResponsiveService,
  ) {
  }

  ngOnDestroy() {
    this.media.destroy();
  }
}
