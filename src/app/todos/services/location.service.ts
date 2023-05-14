import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map } from 'rxjs';

type Route = 'all' | 'active' | 'completed';

function locationHashToRoute(): Route {
  const hash = window.location.hash;
  const stripped = hash.replace('#/', '');
  return stripped === 'active' || stripped === 'completed' ? stripped : 'all';
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private routeSource = new BehaviorSubject<Route>(locationHashToRoute());
  route$ = this.routeSource.asObservable();

  constructor() {
    fromEvent(window, 'hashchange')
      .pipe(
        map(() => locationHashToRoute()),
        distinctUntilChanged()
      )
      .subscribe(this.routeSource);
  }
}
