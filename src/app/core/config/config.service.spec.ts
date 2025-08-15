import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { AppConfig } from './config.schema';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadConfig', () => {
    it('should fetch, validate, and store a valid configuration', async () => {
      const mockConfig: AppConfig = {
        apiUrl: 'https://valid.api.com',
        enableBetaFeatures: true
      };

      const loadPromise = service.loadConfig();

      const req = httpMock.expectOne('/configdata/config.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockConfig);

      await expectAsync(loadPromise).toBeResolved();
      expect(service.getConfig()).toEqual(mockConfig);
    });

    it('should throw an error if the configuration is invalid', async () => {
      const invalidMockConfig = {
        apiUrl: 'not-a-url', // Invalid URL
        enableBetaFeatures: 'not-a-boolean' // Invalid type
      };

      const loadPromise = service.loadConfig();

      const req = httpMock.expectOne('/configdata/config.json');
      req.flush(invalidMockConfig);

      await expectAsync(loadPromise).toBeRejectedWithError('Invalid application configuration.');
    });

    it('should throw an error on HTTP failure', async () => {
      const loadPromise = service.loadConfig();

      const req = httpMock.expectOne('/configdata/config.json');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      await expectAsync(loadPromise).toBeRejected();
    });
  });

  describe('getConfig', () => {
    it('should throw an error if called before config is loaded', () => {
      expect(() => service.getConfig()).toThrowError(
        'ConfigService.getConfig() called before configuration was loaded.'
      );
    });

    it('should return the config after it has been loaded', async () => {
      const mockConfig: AppConfig = { apiUrl: 'https://api.com' };
      const loadPromise = service.loadConfig();
      const req = httpMock.expectOne('/configdata/config.json');
      req.flush(mockConfig);
      await loadPromise;

      expect(service.getConfig()).toEqual(mockConfig);
    });
  });
});
