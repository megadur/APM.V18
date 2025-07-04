import { DrvConfigService } from './drv.config.service';
import { ConfigDTO } from './config.dto';

describe('DrvConfigService', () => {
  let service: DrvConfigService;

  beforeEach(() => {
    service = new DrvConfigService();
  });

  it('should set and get config correctly', () => {
    const config: ConfigDTO = {
      apiUrlGutachten: 'https://example.com/gutachten',
      apiUrlUser: 'https://example.com/user'
    };
    service.setConfig(config);
    expect(service.getConfig()).toBe(config);
  });

  it('should return undefined if config is not set', () => {
    // @ts-expect-error: Accessing before setConfig is called
    expect(service.getConfig()).toBeUndefined();
  });
});
