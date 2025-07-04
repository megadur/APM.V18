import { appLoader } from './app.loader';
import { AppConfigService } from './app.config.service';

describe('appLoader', () => {
  let configService: jasmine.SpyObj<AppConfigService>;

  beforeEach(() => {
    configService = jasmine.createSpyObj('AppConfigService', ['init']);
  });

  it('should resolve true when config.init() resolves', async () => {
    configService.init.and.returnValue(Promise.resolve());
    const loader = appLoader(configService);
    const result = await loader();
    expect(result).toBeTrue();
    expect(configService.init).toHaveBeenCalled();
  });

  it('should resolve true when config.init() rejects', async () => {
    configService.init.and.returnValue(Promise.reject('error'));
    const loader = appLoader(configService);
    const result = await loader();
    expect(result).toBeTrue();
    expect(configService.init).toHaveBeenCalled();
  });
});
