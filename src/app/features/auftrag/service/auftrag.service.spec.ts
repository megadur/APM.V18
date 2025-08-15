import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuftragCollection, AuftragService } from './auftrag.service';
import { HttpResponse } from '@angular/common/http';
import { Gutachtenauftrag } from '../../../shared/models/models';
import { GutachtenauftragApiClient, GutachtenauftragDto, GutachtenportalConfiguration } from '../../../../api/gutachtenportal/v1';
import { ConfigService } from '../../../core/config/config.service';
import { AppConfig } from '../../../core/config/config.schema';

describe('AuftragService', () => {
  let apiClientSpy: jasmine.SpyObj<GutachtenauftragApiClient>;
  let service: AuftragService;
  let mockConfigService: jasmine.SpyObj<ConfigService>;

  const mockConfig: AppConfig = { apiUrl: 'http://test.com/api' };
  const mockDto: GutachtenauftragDto = {
    auftragsId: '1',
    auftragsdatum: '2024-01-01',
    eingangsdatum: '2024-01-01',
    gutachtenstatus: { status: 'neu', changedOn: '2024-01-01' },
  } as GutachtenauftragDto;

  beforeEach(() => {
    const apiClientSpyObj = jasmine.createSpyObj('GutachtenauftragApiClient', [
      'getGutachtenauftragById',
      'getGutachtenauftraege',
    ]);
    // The configuration property needs to be writable for the test
    apiClientSpyObj.configuration = new GutachtenportalConfiguration({ basePath: '' });

    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        AuftragService,
        { provide: GutachtenauftragApiClient, useValue: apiClientSpyObj },
        { provide: ConfigService, useValue: configServiceSpy },
      ],
    });

    apiClientSpy = TestBed.inject(GutachtenauftragApiClient) as jasmine.SpyObj<GutachtenauftragApiClient>;
    mockConfigService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;

    // Provide the mock config before the service is instantiated
    mockConfigService.getConfig.and.returnValue(mockConfig);

    service = TestBed.inject(AuftragService);
  });

  it('should set apiClient basePath from the unified ConfigService', () => {
    expect(apiClientSpy.configuration.basePath).toBe(mockConfig.apiUrl);
  });

  it('should getAuftrag and map dto to model', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(
      of(new HttpResponse({ body: mockDto })),
    );
    service.getAuftrag('1').subscribe((result) => {
      expect(result?.auftragsId).toBe('1');
      expect(result?.gutachtenstatus.value).toBe('neu');
      done();
    });
  });

  it('should return null if response.body is null', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(
      of(new HttpResponse({ body: null as any })),
    );
    service.getAuftrag('1').subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return null on error', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(
      throwError(() => new HttpResponse({ status: 500, statusText: 'Server Error' }))
    );
    service.getAuftrag('1').subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should getAuftraege and return AuftragCollection', (done) => {
    apiClientSpy.getGutachtenauftraege.and.returnValue(
      of({ auftraege: [mockDto], anzahl: 1, offset: 0, limit: 10 } as any)
    );
    service.getAuftraege().subscribe((collection) => {
      expect(collection).toBeInstanceOf(AuftragCollection);
      expect(collection.getAuftragscount()).toBe(1);
      done();
    });
  });
});

describe('AuftragCollection', () => {
  const auftrag: Gutachtenauftrag = {
    auftragsId: '1',
    auftragsdatum: '2024-01-01',
    eingangsdatum: '2024-01-01',
    gutachtenstatus: { value: 'neu', label: 'Neu', changedOn: '2024-01-01' },
  };
  const auftrag2: Gutachtenauftrag = {
    auftragsId: '2',
    auftragsdatum: '2024-01-02',
    eingangsdatum: '2024-01-01',
    gutachtenstatus: {
      value: 'abgeschlossen',
      label: 'Abgeschlossen',
      changedOn: '2024-01-02',
    },
  };

  it('should filter by status', () => {
    const collection = new AuftragCollection({
      auftraege: [auftrag, auftrag2],
      filter: ['neu'],
    });
    expect(collection.getAuftragscount()).toBe(1);
    expect(collection.getAuftraegeForPage(1)[0].auftragsId).toBe('1');
  });

  it('should sort descending by default', () => {
    const collection = new AuftragCollection({
      auftraege: [auftrag, auftrag2],
    });
    const result = collection.getAuftraegeForPage(1);
    expect(result[0].auftragsId).toBe('2');
  });

  it('should sort ascending', () => {
    const collection = new AuftragCollection({
      auftraege: [auftrag, auftrag2],
      sortOrder: 'asc',
    });
    const result = collection.getAuftraegeForPage(1);
    expect(result[0].auftragsId).toBe('1');
  });

  it('should paginate results', () => {
    const collection = new AuftragCollection({
      auftraege: [auftrag, auftrag2],
      sortOrder: 'asc',
    });
    // Set items per page to 1
    (collection as any).itemsProSeite = 1;
    expect(collection.getMaxPageCount()).toBe(2);
    expect(collection.getAuftraegeForPage(2)[0].auftragsId).toBe('2');
  });
});
