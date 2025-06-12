import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { apiInterceptor } from './api.interceptor';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AppConfigService } from '../SaikiranHegde/app.config.service';
import { of } from 'rxjs';

describe('apiInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  class MockAppConfigService {
    appConfig: any = {};
  }

  describe('apiInterceptor', () => {
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => apiInterceptor(req, next));

    let mockAppConfigService: MockAppConfigService;

    beforeEach(() => {
      mockAppConfigService = new MockAppConfigService();

      TestBed.configureTestingModule({
        providers: [
          { provide: AppConfigService, useValue: mockAppConfigService }
        ]
      });
    });

    it('should be created', () => {
      expect(interceptor).toBeTruthy();
    });

    it('should use userServiceUrl from appConfig if present', (done) => {
      mockAppConfigService.appConfig = { userServiceUrl: 'https://custom.api.url' };
      const req = new HttpRequest('GET', '/api/test');
      const next: HttpHandlerFn = (request) => {
        expect(request.url).toBe('https://custom.api.url');
        return of({} as HttpEvent<any>);
      };
      interceptor(req, next).subscribe(() => done());
    });

    it('should use default url if userServiceUrl is not present', (done) => {
      mockAppConfigService.appConfig = {};
      const req = new HttpRequest('GET', '/api/test');
      const next: HttpHandlerFn = (request) => {
        expect(request.url).toBe('https://default.api.url');
        return of({} as HttpEvent<any>);
      };
      interceptor(req, next).subscribe(() => done());
    });

    it('should use default url if appConfig is undefined', (done) => {
      mockAppConfigService.appConfig = undefined;
      const req = new HttpRequest('GET', '/api/test');
      const next: HttpHandlerFn = (request) => {
        expect(request.url).toBe('https://default.api.url');
        return of({} as HttpEvent<any>);
      };
      interceptor(req, next).subscribe(() => done());
    });
  });
});
