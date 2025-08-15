import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { myInterceptor } from './my.interceptor';
import { ConfigService } from '../config.service';
import { AppConfig } from '../config.schema';

describe('myInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => myInterceptor(req, next));

  let mockConfigService: jasmine.SpyObj<ConfigService>;

  beforeEach(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: configServiceSpy }
      ]
    });

    mockConfigService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
  });

  it('should be created', () => {
    mockConfigService.getConfig.and.returnValue({});
    expect(interceptor).toBeTruthy();
  });

  it('should replace localhost url with config.apiUrl', (done) => {
    // Arrange
    const mockConfig: AppConfig = { apiUrl: 'https://api.example.com/api/v1' };
    mockConfigService.getConfig.and.returnValue(mockConfig);
    const req = new HttpRequest('GET', 'http://localhost:8080/api/v1/test');

    // Act
    const next: HttpHandlerFn = (request) => {
      // Assert
      expect(request.url).toBe('https://api.example.com/api/v1/test');
      return of({} as HttpEvent<any>);
    };
    interceptor(req, next).subscribe(() => done());
  });

  it('should not modify the URL if config.apiUrl is not present', (done) => {
    // Arrange
    const mockConfig: AppConfig = {}; // No apiUrl
    mockConfigService.getConfig.and.returnValue(mockConfig);
    const req = new HttpRequest('GET', 'http://localhost:8080/api/v1/test');

    // Act
    const next: HttpHandlerFn = (request) => {
      // Assert
      expect(request.url).toBe('http://localhost:8080/api/v1/test');
      return of({} as HttpEvent<any>);
    };
    interceptor(req, next).subscribe(() => done());
  });

  it('should not modify the URL if it does not start with the local API url', (done) => {
    // Arrange
    const mockConfig: AppConfig = { apiUrl: 'https://api.example.com/api/v1' };
    mockConfigService.getConfig.and.returnValue(mockConfig);
    const req = new HttpRequest('GET', 'https://some-other-site.com/api/test');

    // Act
    const next: HttpHandlerFn = (request) => {
      // Assert
      expect(request.url).toBe('https://some-other-site.com/api/test');
      return of({} as HttpEvent<any>);
    };
    interceptor(req, next).subscribe(() => done());
  });
});
