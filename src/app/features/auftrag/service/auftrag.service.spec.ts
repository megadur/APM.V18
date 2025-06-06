import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuftragService, AuftragCollection } from './auftrag.service';
import { GutachtenauftragApiClient, GutachtenauftragDto } from '../../../../generated/gutachtenservice-client';
import { ENV_CONFIG } from '../../seanhaddock/app-config';
import { HttpResponse } from '@angular/common/http';
import { Gutachtenauftrag } from '../../../shared/models/models';

describe('AuftragService', () => {
  let apiClientSpy: jasmine.SpyObj<GutachtenauftragApiClient>;
  let service: AuftragService;
  const mockConfig = { apiUrl: 'http://test' };
  const mockDto: GutachtenauftragDto = {
    id: '1',
    auftragsdatum: '2024-01-01',
    eingangsdatum: '2024-01-01',
    gutachtenstatus: { status: 'neu', changedOn: '2024-01-01' },
    // ...other properties as needed
  } as GutachtenauftragDto;

  beforeEach(() => {
    apiClientSpy = jasmine.createSpyObj('GutachtenauftragApiClient', [
      'getGutachtenauftragById',
      'getGutachtenauftraege',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AuftragService,
        { provide: GutachtenauftragApiClient, useValue: apiClientSpy },
        { provide: ENV_CONFIG, useValue: mockConfig },
      ],
    });
    service = TestBed.inject(AuftragService);
  });

  it('should set apiClient basePath from appConfig', () => {
    expect(apiClientSpy.configuration.basePath).toBe(mockConfig.apiUrl);
  });

  it('should getAuftrag and map dto to model', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(
      of(new HttpResponse({ body: mockDto }))
    );
    service.getAuftrag('1').subscribe(result => {
      expect(result?.auftragsId).toBe('1');
      expect(result?.gutachtenstatus.value).toBe('neu');
      done();
    });
  });

  it('should return null if response.body is null', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(
      of(new HttpResponse<GutachtenauftragDto>({ body: null as unknown as GutachtenauftragDto }))
    );
    service.getAuftrag('1').subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return null on error', (done) => {
    apiClientSpy.getGutachtenauftragById.and.returnValue(throwError({ status: 500, statusText: 'Server Error' }));
    service.getAuftrag('1').subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });


  it('should getAuftraege and return AuftragCollection', (done) => {
    apiClientSpy.getGutachtenauftraege.and.returnValue(
      of(new HttpResponse({ body: { auftraege: [mockDto], anzahl: 1, offset: 0, limit: 10 } }))
    );
    service.getAuftraege().subscribe(collection => {
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
  const auftrag2: Gutachtenauftrag= {
    auftragsId: '2',
    auftragsdatum: '2024-01-02',
    eingangsdatum: '2024-01-01',
    gutachtenstatus: { value: 'abgeschlossen', label: 'Abgeschlossen', changedOn: '2024-01-02' },
  };

  it('should filter by status', () => {
    const collection = new AuftragCollection({ auftraege: [auftrag, auftrag2], filter: ['neu'] });
    expect(collection.getAuftragscount()).toBe(1);
    expect(collection.getAuftraegeForPage(1)[0].auftragsId).toBe('1');
  });

  it('should sort descending by default', () => {
    const collection = new AuftragCollection({ auftraege: [auftrag, auftrag2] });
    const result = collection.getAuftraegeForPage(1);
    expect(result[0].auftragsId).toBe('2');
  });

  it('should sort ascending', () => {
    const collection = new AuftragCollection({ auftraege: [auftrag, auftrag2], sortOrder: 'asc' });
    const result = collection.getAuftraegeForPage(1);
    expect(result[0].auftragsId).toBe('1');
  });

  it('should paginate results', () => {
    const collection = new AuftragCollection({ auftraege: [auftrag, auftrag2], sortOrder: 'asc' });
    // Set items per page to 1
    (collection as any).itemsProSeite = 1;
    expect(collection.getMaxPageCount()).toBe(2);
    expect(collection.getAuftraegeForPage(2)[0].auftragsId).toBe('2');
  });
});