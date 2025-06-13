import { ConfigService } from './config.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { IConfig } from './config.model';
import { Config } from './config';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// filepath: src/app/core/ayyash/services/config.service.test.ts

describe('ConfigServiceTest', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ConfigService;
  const mockConfig: IConfig = {
    ...Config,
    apiUrl: 'http://test',
    isServed: false,
    withError: false,
  };
  const environment = { configUrl: '/assets/config.json' };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ConfigService(httpClientSpy);
    // @ts-ignore: override environment import
    (service as any).http = httpClientSpy;
    // Reset static _config
    (ConfigService as any)._config = undefined;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('static Config getter', () => {
    it('should return static _config if set', () => {
      (ConfigService as any)._config = mockConfig;
      expect(ConfigService.Config).toBe(mockConfig);
    });

    it('should return default Config if static _config is not set', () => {
      (ConfigService as any)._config = undefined;
      expect(ConfigService.Config).toBe(Config);
    });
  });

  describe('loadAppConfig', () => {
    it('should fetch config and call _createConfig with response, return true', (done) => {
      httpClientSpy.get.and.returnValue(of(mockConfig));
      spyOn<any>(service, '_createConfig').and.callThrough();

      service.loadAppConfig().subscribe((result) => {
        expect(httpClientSpy.get).toHaveBeenCalled();
        expect((service as any)._createConfig).toHaveBeenCalledWith(
          mockConfig,
          false,
        );
        expect(result).toBeTrue();
        done();
      });
    });

    it('should handle error, call _createConfig with default Config, return false', (done) => {
      httpClientSpy.get.and.returnValue(throwError(() => new Error('fail')));
      spyOn<any>(service, '_createConfig').and.callThrough();

      service.loadAppConfig().subscribe((result) => {
        expect((service as any)._createConfig).toHaveBeenCalledWith(
          Config,
          true,
        );
        expect(result).toBeFalse();
        done();
      });
    });
  });

  describe('_createConfig', () => {
    it('should update static _config, set isServed and withError, and emit via BehaviorSubject', (done) => {
      const testConfig = { apiUrl: 'http://x' };
      const spy = spyOn((service as any).config, 'next').and.callThrough();

      (service as any)._createConfig(testConfig, true);

      const expected = {
        ...Config,
        ...testConfig,
        isServed: true,
        withError: true,
      };
      expect((ConfigService as any)._config).toEqual(expected);
      expect(spy).toHaveBeenCalledWith(testConfig);

      service.config$.subscribe((val) => {
        expect(val).toEqual(jasmine.objectContaining(testConfig));
        done();
      });
    });
  });

  describe('config$', () => {
    it('should emit the latest config', (done) => {
      const newConfig = { apiUrl: 'http://y' };
      (service as any)._createConfig(newConfig, false);

      service.config$.subscribe((val) => {
        expect(val.apiUrl).toBe('http://y');
        done();
      });
    });
  });
});
