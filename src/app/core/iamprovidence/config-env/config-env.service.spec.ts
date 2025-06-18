import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ConfigEnvService } from './config-env.service';
import { ConfigEnv } from './config-env';

describe('ConfigEnvService', () => {
  let service: ConfigEnvService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockConfig: ConfigEnv = {
    apiUrl: 'https://api.example.com',
    apiVersion: 'v1',
    enableBetaFeatures: true
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        ConfigEnvService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ConfigEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default config initially', () => {
    const config = service.getConfig();
    expect(config).toEqual({ apiUrl: '', apiVersion: '', enableBetaFeatures: false });
  });

  it('should load config on initialize', async () => {
    httpClientSpy.get.and.returnValue(of(mockConfig));
    await service.initialize();
    expect(service.getConfig()).toEqual(mockConfig);
    expect(httpClientSpy.get).toHaveBeenCalledWith('/configdata/config.json');
  });
});
