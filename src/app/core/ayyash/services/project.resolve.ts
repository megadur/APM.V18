import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { first, map, Observable, of, tap } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolve implements Resolve<boolean> {
  constructor(private configService: ConfigService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // mimic a resolve with config service
    return this.configService.config$.pipe(
      tap((n) => console.log('is config ready', n)),
      first((n) => n.isServed),
      map((n) => {
        // if served with error, reroute or notify user, but do not block
        console.log(n.withError);
        return true;
      })
    );
  }
}
