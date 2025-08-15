import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { apiInterceptor } from './api.interceptor';
import { ConfigService } from '../config.service';
import { AppConfig } from '../config.schema';

describe('apiInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));

  let mockConfigService: jasmine.SpyObj<ConfigService>;

  beforeEach(() => {
    // Create a spy object for ConfigService
    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: configServiceSpy }
      ]
    });

    mockConfigService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
  });

  it('should be created', () => {
    // Provide a default mock implementation to avoid errors on creation
    mockConfigService.getConfig.and.returnValue({});
    expect(interceptor).toBeTruthy();
  });

  it('should use userServiceUrl from config if present', (done) => {
    // Arrange
    const mockConfig: AppConfig = { userServiceUrl: 'https://custom.api.url' };
    mockConfigService.getConfig.and.returnValue(mockConfig);
    const req = new HttpRequest('GET', '/api/test');

    // Act
    const next: HttpHandlerFn = (request) => {
      // Assert
      expect(request.url).toBe('https://custom.api.url');
      return of({} as HttpEvent<any>);
    };
    interceptor(req, next).subscribe(() => done());
  });

  it('should pass original request if userServiceUrl is not present', (done) => {
    // Arrange
    const mockConfig: AppConfig = { apiUrl: 'http://some-other-api.com' }; // No userServiceUrl
    mockConfigService.getConfig.and.returnValue(mockConfig);
    const req = new HttpRequest('GET', '/api/test');

    // Act
    const next: HttpHandlerFn = (request) => {
      // Assert
      expect(request.url).toBe('/api/test'); // The URL should be unchanged
      return of({} as HttpEvent<any>);
    };
    interceptor(req, next).subscribe(() => done());
  });
});
