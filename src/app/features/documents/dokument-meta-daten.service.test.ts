import { DokumentMetaDatenService } from './dokument-meta-daten.service';
import { GutachtenApiClient } from '../../../api/gutachtenportal/v1';
import { DokumentMetaDatenCollection } from './dokument-meta-daten-collection';
import { of, throwError } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';
import { SortOrder } from '../auftrag/service/auftrag.service';

describe('DokumentMetaDatenService', () => {
  let service: DokumentMetaDatenService;
  let apiClientSpy: jasmine.SpyObj<GutachtenApiClient>;

  beforeEach(() => {
    apiClientSpy = jasmine.createSpyObj('GutachtenApiClient', ['getAssessmentAttachements']);
    // @ts-ignore: inject is used in the service, so we patch it here
    service = new DokumentMetaDatenService();
    // Patch the injected apiClient
    (service as any).apiClient = apiClientSpy;
  });

  it('should return DokumentMetaDatenCollection when API returns valid data', (done) => {
    const mockResponse = {
      body: {
        dokumente: [
          { metadaten: { id: '1', name: 'doc1' } },
          { metadaten: { id: '2', name: 'doc2' } },
        ],
      },
    };
    apiClientSpy.getAssessmentAttachements.and.returnValue(of(mockResponse));

    service.getDokumentMetaDatenForAuftrag('123', { searchTerm: 'foo', sortOrder: SortOrder.ASC })
      .subscribe(result => {
        expect(result).toEqual(jasmine.any(DokumentMetaDatenCollection));
        expect((result as DokumentMetaDatenCollection).items.length).toBe(2);
        expect((result as DokumentMetaDatenCollection).searchTerm).toBe('foo');
        expect((result as DokumentMetaDatenCollection).sortOrder).toBe(SortOrder.ASC);
        done();
      });
  });

  it('should return null and log error if response body is null', (done) => {
    const consoleErrorSpy = spyOn(console, 'error');
    apiClientSpy.getAssessmentAttachements.and.returnValue(of({ body: null }));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Body ist null, obwohl es keinen Status Fehler vom Server gab'
      );
      done();
    });
  });

  it('should return null and not log error for 404 error', (done) => {
    const error: Partial<HttpErrorResponse> = { status: 404, statusText: 'Not Found' };
    const consoleErrorSpy = spyOn(console, 'error');
    apiClientSpy.getAssessmentAttachements.and.returnValue(throwError(error));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it('should return null and log error for non-404 error', (done) => {
    const error: Partial<HttpErrorResponse> = { status: 500, statusText: 'Server Error' };
    const consoleErrorSpy = spyOn(console, 'error');
    apiClientSpy.getAssessmentAttachements.and.returnValue(throwError(error));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Unerwarteter Status Code 500 mit Server Error. Erwarte nur 200 oder 404'
      );
      done();
    });
  });
});
