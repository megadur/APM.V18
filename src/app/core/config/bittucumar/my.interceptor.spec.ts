import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { myInterceptor } from './my.interceptor';
import { ConfigZodService } from '../zod/config-zod.service';

describe('myInterceptor', () => {
  let configZodServiceSpy: jasmine.SpyObj<ConfigZodService>;
  const mockConfig = { apiUrl: 'https://api.example.com' };

  beforeEach(() => {
    configZodServiceSpy = jasmine.createSpyObj('ConfigZodService', ['getConfig']);
    configZodServiceSpy.getConfig.and.returnValue(mockConfig);

    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigZodService, useValue: configZodServiceSpy }
      ]
    });
  });

  function runInterceptor(req: HttpRequest<any>, nextSpy?: jasmine.Spy) {
    const next: HttpHandlerFn = nextSpy || jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) =>
      of(new HttpResponse({ status: 200, url: r.url }))
    );
    return TestBed.runInInjectionContext(() => myInterceptor(req, next));
  }

  it('should be created', () => {
    expect(myInterceptor).toBeTruthy();
  });

  it('should not modify url if it matches config endpoint', (done) => {
    const req = new HttpRequest('GET', '/assets/cfg/config.json');
    const next = jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) => {
      expect(r.url).toBe('/assets/cfg/config.json');
      done();
      return of(new HttpResponse({ status: 200 }));
    });
    runInterceptor(req, next).subscribe();
  });

  it('should replace localhost url with config.apiUrl', (done) => {
    const req = new HttpRequest('GET', 'http://localhost:8080/api/v1/test');
    const next = jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) => {
      expect(r.url).toBe('https://api.example.com/test');
      done();
      return of(new HttpResponse({ status: 200 }));
    });
    runInterceptor(req, next).subscribe();
  });

  it('should use default url if config.apiUrl is undefined', (done) => {
    configZodServiceSpy.getConfig.and.returnValue({});
    const req = new HttpRequest('GET', 'http://localhost:8080/api/v1/test');
    const next = jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) => {
      // Adjust this expectation based on your actual default URL logic
      expect(r.url).toBe('http://localhost:8080/api/v1/test'); // or whatever your default should be
      done();
      return of(new HttpResponse({ status: 200 }));
    });
    runInterceptor(req, next).subscribe();
  });

  it('should handle non-localhost URLs without modification', (done) => {
    const req = new HttpRequest('GET', 'https://external-api.com/data');
    const next = jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) => {
      expect(r.url).toBe('https://external-api.com/data');
      done();
      return of(new HttpResponse({ status: 200 }));
    });
    runInterceptor(req, next).subscribe();
  });

  it('should handle errors gracefully', (done) => {
    const req = new HttpRequest('GET', 'http://localhost:8080/api/v1/test');
    const next = jasmine.createSpy('next').and.callFake((r: HttpRequest<any>) => {
      expect(r).toBeDefined();
      done();
      return of(new HttpResponse({ status: 200 }));
    });

    // Simulate config service throwing an error
    configZodServiceSpy.getConfig.and.throwError('Config service error');

    runInterceptor(req, next).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });
  });
});
