import {ChangeDetectorRef, Injectable} from "@angular/core";

import {MediaMatcher} from '@angular/cdk/layout'

@Injectable()
/**
 * 监听响应式布局
 */
export class MediaResponsiveService {
  private readonly mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  constructor(ref: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:600px)')
    this.mobileQueryListener = () => ref.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  // 放置在 ngOnDestroy 中
  destroy(): void {
    if (this.mobileQuery && this.mobileQueryListener) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener)
    }
  }

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }
}
