import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter} from "rxjs";

export function htmlTitle(router: Router, ts: Title, siteTitle: string) {
  const hasDefTitle = siteTitle != '';

  router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_ => {
    let c = router.routerState.root.firstChild;
    const titles: string[] = new Array<string>();
    let hasTitle = false;
    while (c) {
      if (c.snapshot.routeConfig && c.snapshot.routeConfig.data) {
        // @ts-ignore
        const title = c.snapshot.routeConfig.data.title;
        if (title) {
          hasTitle = true;
          titles.push(title);
        }
      }
      c = c.firstChild;
    }
    if (hasTitle) {
      if (hasDefTitle) {
        titles.push(siteTitle)
      }
      ts.setTitle(titles.join('-'));
    } else if (hasDefTitle) {
      ts.setTitle(siteTitle)
    }
  })
}
