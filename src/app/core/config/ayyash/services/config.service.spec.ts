import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Config } from './config.default';
import { IConfig } from './config.model';
import { ConfigService } from './config.service';

describe('ConfigServiceSpec', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  const mockConfig: IConfig = {
    ...Config,
    apiUrl: 'http://mock-api',
    isServed: true,
    withError: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ConfigService,
        provideHttpClient(),
        provideHttpClientTesting(), // This is needed to provide HttpClient and HttpTestingController
      ],
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('static Config getter returns static _config if set', () => {
    // @ts-ignore
    ConfigService._config = mockConfig;
    expect(ConfigService.Config).toEqual(mockConfig);
    // @ts-ignore
    ConfigService._config = undefined;
    expect(ConfigService.Config).toEqual(Config);
  });

  it('should load config from API and update observable', (done) => {
    service.config$.subscribe((val) => {
      if (val.apiUrl === mockConfig.apiUrl) {
        expect(val.isServed).toBeTrue();
        expect(val.withError).toBeFalse();
        done();
      }
    });
    service.loadAppConfig().subscribe((result) => {
      expect(result).toBeTrue();
    });
    const req = httpMock.expectOne(environment.configUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });

  xit('should fallback to default config on error', (done) => {
    const sub = service.config$.subscribe((val) => {
      if (val.withError) {
        expect(val.isServed).toBeTrue();
        expect(val.withError).toBeTrue();
        sub.unsubscribe();
        done();
      }
    });
    service.loadAppConfig().subscribe({
      next: (result) => {
        expect(result).toBeFalse();
      },
      error: () => {
        // Should not reach here
        sub.unsubscribe();
        done.fail('Observable errored unexpectedly');
      }
    });
    const req = httpMock.expectOne(environment.configUrl);
    req.error(new ProgressEvent('error'));
  });

  it('should update static _config and BehaviorSubject in _createConfig', () => {
    // @ts-ignore
    service['_createConfig'](mockConfig, true);
    // @ts-ignore
    expect(ConfigService._config.isServed).toBeTrue();
    // @ts-ignore
    expect(ConfigService._config.withError).toBeTrue();
  });
});
