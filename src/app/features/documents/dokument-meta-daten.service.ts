import type { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of, type Observable } from 'rxjs';
import { GutachtenApiClient } from '../../../api/gutachtenportal/v1';
import { DokumentMetaDatenCollection } from './dokument-meta-daten-collection';
import { SortOrder } from '../auftrag/service/auftrag.service';


@Injectable({
  providedIn: 'root',
})
export class DokumentMetaDatenService {
  private apiClient = inject(GutachtenApiClient);

  getDokumentMetaDatenForAuftrag(
    id: string,
    {
      searchTerm,
      sortOrder,
    }: {
      searchTerm?: string;
      sortOrder?: SortOrder;
    } = {},
  ): Observable<DokumentMetaDatenCollection | null> {
    // Die API macht eine Paginierung im Backend. Wir haben aber besprochen,
    // dass wir erstmal versuchen alles im Frontend zu machen. Deswegen werden
    // hier offset und limit gehardcoded
    return this.apiClient
      .getAssessmentAttachements(id, '', '', '', 0, 9000, 'response')
      .pipe(
        map((res) => {
          if (res.body === null) {
            console.error(
              'Body ist null, obwohl es keinen Status Fehler vom Server gab',
            );

            return null;
          }

          return new DokumentMetaDatenCollection({
            items: res.body.dokumente.map((i) => i.metadaten),
            searchTerm,
            sortOrder,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status !== 404) {
            console.error(
              `Unerwarteter Status Code ${err.status} mit ${err.statusText}. Erwarte nur 200 oder 404`,
            );
          }

          return of(null);
        }),
      );
  }
}
