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

    service.getDokumentMetaDatenForAuftrag('123', { searchTerm: 'foo', sortOrder: 'asc' as SortOrder })
      .subscribe(result => {
        expect(result).toBeInstanceOf(DokumentMetaDatenCollection);
        expect((result as DokumentMetaDatenCollection).items.length).toBe(2);
        expect((result as DokumentMetaDatenCollection).getSearchTerm()).toBe('foo');
        expect((result as DokumentMetaDatenCollection).sortOrder).toBe('asc');
        done();
      });
  });

  it('should return null and log error if response body is null', (done) => {
    spyOn(console, 'error');
    const mockResponse = { body: null };
    apiClientSpy.getAssessmentAttachements.and.returnValue(of(mockResponse));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Body ist null, obwohl es keinen Status Fehler vom Server gab'
      );
      done();
    });
  });

  it('should return null and not log error if error status is 404', (done) => {
    spyOn(console, 'error');
    const error: Partial<HttpErrorResponse> = { status: 404, statusText: 'Not Found' };
    apiClientSpy.getAssessmentAttachements.and.returnValue(throwError(error));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(console.error).not.toHaveBeenCalled();
      done();
    });
  });

  it('should return null and log error if error status is not 404', (done) => {
    spyOn(console, 'error');
    const error: Partial<HttpErrorResponse> = { status: 500, statusText: 'Server Error' };
    apiClientSpy.getAssessmentAttachements.and.returnValue(throwError(error));

    service.getDokumentMetaDatenForAuftrag('123').subscribe(result => {
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Unerwarteter Status Code 500 mit Server Error. Erwarte nur 200 oder 404'
      );
      done();
    });
  });
});
