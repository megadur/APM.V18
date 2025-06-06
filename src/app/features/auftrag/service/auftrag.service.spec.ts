
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';


import { AuftragCollection, AuftragService } from './auftrag.service';
import { GutachtenstatusDto, GutachtenauftragListDto } from '../../../../generated/gutachtenservice-client';
import { GutachtenstatusFilter } from '../../../shared/models/models';
import { MY_ENV_CONFIG } from '../../seanhaddock/initialize-app.factory';
import { generateAuftragDto, generateAuftrag } from '../../../../Test/AuftragGen';

// Define EnvConfig type for testing purposes
type EnvConfig = { apiHost: string; apiUrl?: string };

describe('AuftragService', () => {
  let auftragsservice: AuftragService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const mockConfig: EnvConfig = { apiHost: 'http://test-api' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // Reset MY_APP_CONFIG before each test
    MY_ENV_CONFIG.apiUrl = '';
    auftragsservice = TestBed.inject(AuftragService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  fit('sollte erstellt werden können', () => {
    httpClientSpy.get.and.returnValue(of(mockConfig));
    expect(auftragsservice).toBeTruthy();
  });

  it('sollte `null` für einen nicht existierenden Auftrag zurückgeben', async () => {
    const observeGetAuftrag = auftragsservice.getAuftrag('1');
    const promiseToGetAuftrag = firstValueFrom(observeGetAuftrag);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege/1',
    );

    expect(testRequest.request.method).toBe('GET');

    testRequest.flush('Not Found', {
      status: 404,
      statusText: 'Gutachtenauftrag konnte nicht gefunden werden',
    });

    expect(await promiseToGetAuftrag).toEqual(null);

    httpTestingController.verify();
  });

  it('sollte unerwartete Fehler händeln', async () => {
    const observeGetAuftrag = auftragsservice.getAuftrag('1');
    const promiseToGetAuftrag = firstValueFrom(observeGetAuftrag);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege/1',
    );

    expect(testRequest.request.method).toBe('GET');

    testRequest.flush('Server Error', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(await promiseToGetAuftrag).toBeNull();

    httpTestingController.verify();
  });

  it('sollte einen existierenden Auftrag holen', async () => {
    const observeGetAuftrag = auftragsservice.getAuftrag('1');
    const promiseToGetAuftrag = firstValueFrom(observeGetAuftrag);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege/1',
    );

    expect(testRequest.request.method).toBe('GET');

    const responseBody = generateAuftragDto();
    const expectedAuftrag = AuftragService.dtoToModel(responseBody);

    testRequest.flush(responseBody);

    expect(await promiseToGetAuftrag).toEqual(expectedAuftrag);

    httpTestingController.verify();
  });

  it('sollte `null` bei einem existierenden Auftrag händeln können', async () => {
    const observeGetAuftrag = auftragsservice.getAuftrag('1');
    const promiseToGetAuftrag = firstValueFrom(observeGetAuftrag);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege/1',
    );

    testRequest.flush(null);

    expect(await promiseToGetAuftrag).toEqual(null);

    httpTestingController.verify();
  });

  it('sollte alle Aufträge holen und als AuftragCollection zurückgeben', async () => {
    const observeGetAuftraege = auftragsservice.getAuftraege();
    const promiseToGetAuftraege = firstValueFrom(observeGetAuftraege);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege?offset=0&limit=9000',
    );

    expect(testRequest.request.method).toBe('GET');

    const status = Object.values(GutachtenstatusDto.StatusEnum);
    const responseBody: Partial<GutachtenauftragListDto> = {
      auftraege: [...new Array(status.length)].map(() => generateAuftragDto()),
    };

    status.forEach(
      (status, i) =>
        (responseBody.auftraege![i].gutachtenstatus.status = status),
    );

    const expectedAuftraege = new AuftragCollection({
      auftraege: responseBody.auftraege!.map(AuftragService.dtoToModel),
    });

    testRequest.flush(responseBody);

    expect(await promiseToGetAuftraege).toEqual(expectedAuftraege);

    httpTestingController.verify();
  });

  it('sollte unbekannten Bearbeitungsstatus händeln', async () => {
    const observeGetAuftraege = auftragsservice.getAuftraege();
    const promiseToGetAuftraege = firstValueFrom(observeGetAuftraege);
    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/v1/gutachtenauftraege?offset=0&limit=9000',
    );

    expect(testRequest.request.method).toBe('GET');

    const responseBody: Partial<GutachtenauftragListDto> = {
      auftraege: [
        generateAuftragDto(),
        generateAuftragDto(),
        generateAuftragDto(),
      ],
    };

    // @ts-expect-error teste unbekannten Status
    responseBody.auftraege![0].gutachtenstatus.status = 'unbekannter Status';

    const expectedAuftraege = new AuftragCollection({
      auftraege: responseBody.auftraege!.map(AuftragService.dtoToModel),
    });

    testRequest.flush(responseBody);

    expect(await promiseToGetAuftraege).toEqual(expectedAuftraege);

    httpTestingController.verify();
  });
});

describe('AuftragCollection', () => {
  const auftragDtos = [
    generateAuftragDto(),
    generateAuftragDto(),
    generateAuftragDto(),
  ];
  const auftraege = auftragDtos.map(AuftragService.dtoToModel);

  it('sollte alle Aufträge zurückgeben', async () => {
    const auftragCollection = new AuftragCollection({
      auftraege,
      filter: [],
    });

    expect(auftragCollection.getAuftraegeForPage(1)).toEqual(auftraege);
  });

  it('sollte die Paginierung ermöglichen', async () => {
    const auftragCollection = new AuftragCollection({
      auftraege,
      filter: [],
    });

    expect(auftragCollection.getAuftraegeForPage(1).length).toEqual(3);
    expect(auftragCollection.getAuftraegeForPage(-2).length).toEqual(0);
    expect(auftragCollection.getAuftraegeForPage(2).length).toEqual(0);
  });

  it('sollte die maximale Seitenanzahl kalkulieren', async () => {
    const auftragCollection = new AuftragCollection({
      auftraege: [...new Array(27)].map(generateAuftrag),
      filter: [],
    });

    expect(auftragCollection.getMaxPageCount()).toEqual(3);
  });

  it('sollte Aufträge filtern können', () => {
    const auftraege = [...new Array(20)].map(generateAuftrag);
    const data = [
      ['neu'],
      ['einbestellt'],
      ['in_bearbeitung'],
      ['abgeschlossen'],
      ['storniert'],
      ['storniert', 'abgeschlossen'],
      [],
    ] as GutachtenstatusFilter[];

    data.forEach((filter) => {
      const auftragCollection = new AuftragCollection({
        auftraege,
        filter,
      });

      if (filter.length === 0) {
        expect(auftragCollection.getAuftragscount()).toBe(auftraege.length);
      } else {
        expect(auftragCollection.getAuftragscount()).toEqual(
          auftraege.filter((a) => filter.includes(a.gutachtenstatus.value))
            .length,
        );
      }
    });
  });

  it('sollte die Aufträge nach Auftragsdatum aufsteigend sortieren', () => {
    const auftraege = [...new Array(20)].map(generateAuftrag);
    const collection = new AuftragCollection({ auftraege, sortOrder: 'asc' });
    const firstPage = collection.getAuftraegeForPage(1);

    const isSorted = firstPage.every((auftrag, index) => {
      if (index === firstPage.length - 1) {
        return true;
      }

      return (
        auftrag.auftragsdatum.localeCompare(
          firstPage[index + 1].auftragsdatum,
        ) < 0
      );
    });

    expect(isSorted).toBeTrue();
  });

  it('sollte die Aufträge nach Auftragsdatum absteigend sortieren', () => {
    const auftraege = [...new Array(20)].map(generateAuftrag);
    const collection = new AuftragCollection({ auftraege, sortOrder: 'desc' });
    const firstPage = collection.getAuftraegeForPage(1);

    const isSorted = firstPage.every((auftrag, index) => {
      if (index === firstPage.length - 1) {
        return true;
      }

      return (
        auftrag.auftragsdatum.localeCompare(
          firstPage[index + 1].auftragsdatum,
        ) > 0
      );
    });

    expect(isSorted).toBeTrue();
  });
});
