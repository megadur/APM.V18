import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { initializeAppFactory, MY_APP_CONFIG } from './initialize-app.factory';
import { AppConfig } from './app-config';

describe('initializeAppFactory', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const mockConfig: AppConfig = { apiHost: 'http://test-api' };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // Reset MY_APP_CONFIG before each test
    MY_APP_CONFIG.apiHost = '';
  });

  it('should fetch config and update MY_APP_CONFIG', (done) => {
    httpClientSpy.get.and.returnValue(of(mockConfig));

    const initializer = initializeAppFactory(httpClientSpy);
    initializer().subscribe((config) => {
      expect(httpClientSpy.get).toHaveBeenCalledWith('/assets/app.config.json');
      expect(config).toEqual(mockConfig);
      expect(MY_APP_CONFIG.apiHost).toBe('http://test-api');
      done();
    });
  });

  it('should keep other properties in MY_APP_CONFIG if present', (done) => {
    // Add a property to MY_APP_CONFIG
    (MY_APP_CONFIG as any).other = 'keepme';
    httpClientSpy.get.and.returnValue(of(mockConfig));

    const initializer = initializeAppFactory(httpClientSpy);
    initializer().subscribe(() => {
      expect((MY_APP_CONFIG as any).other).toBe('keepme');
      done();
    });
  });
});