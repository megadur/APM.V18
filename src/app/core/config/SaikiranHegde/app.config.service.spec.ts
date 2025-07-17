import { TestBed } from '@angular/core/testing';
import { AppConfigService } from './app.config.service';


describe('AppConfigService', () => {
  let service: AppConfigService;

  const mockConfig = {
    features: {
      featureA: true,
      featureB: false,
    },
    other: 'value'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService],
    });
    service = TestBed.inject(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set appConfig from setAppConfig', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      json: async () => mockConfig
    } as Response);

    await service.setAppConfig();
    expect(service.appConfig).toEqual(mockConfig);
  });

  it('should return correct feature value', () => {
    service.appConfig = mockConfig;
    expect(service.getFeatureValue('featureA')).toBeTrue();
    expect(service.getFeatureValue('featureB')).toBeFalse();
    expect(service.getFeatureValue('nonexistent')).toBeFalse();
  });

  it('should call setAppConfig in init', async () => {
    const setAppConfigSpy = spyOn(service, 'setAppConfig').and.returnValue(Promise.resolve());
    await service.init();
    expect(setAppConfigSpy).toHaveBeenCalled();
  });
});
