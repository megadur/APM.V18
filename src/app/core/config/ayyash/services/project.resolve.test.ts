import { ProjectResolve } from './project.resolve';
import { ConfigService } from './config.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('ProjectResolve', () => {
  let configService: jasmine.SpyObj<ConfigService>;
  let resolver: ProjectResolve;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    configService = jasmine.createSpyObj('ConfigService', [], {
      config$: new Subject<any>()
    });
    resolver = new ProjectResolve(configService);
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should resolve when config$.isServed is true', (done) => {
    const configSubject = new Subject<any>();
    (configService as any).config$ = configSubject.asObservable();

    resolver.resolve(route, state).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

    configSubject.next({ isServed: false, withError: false });
    configSubject.next({ isServed: true, withError: false });
  });

  it('should resolve even if withError is true', (done) => {
    const configSubject = new Subject<any>();
    (configService as any).config$ = configSubject.asObservable();

    resolver.resolve(route, state).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

    configSubject.next({ isServed: true, withError: true });
  });

  it('should only emit once when isServed becomes true', (done) => {
    const configSubject = new Subject<any>();
    (configService as any).config$ = configSubject.asObservable();

    let callCount = 0;
    resolver.resolve(route, state).subscribe(result => {
      callCount++;
      expect(result).toBeTrue();
      expect(callCount).toBe(1);
      done();
    });

    configSubject.next({ isServed: false, withError: false });
    configSubject.next({ isServed: true, withError: false });
    configSubject.next({ isServed: true, withError: false }); // should not trigger again
  });
});
