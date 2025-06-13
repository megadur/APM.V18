
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { GutachtenauftragApiClient, GutachtenauftragDto, GutachtenstatusDto } from '../../../../generated/gutachtenservice-client';
import { Gutachtenauftrag, GutachtenstatusFilter } from '../../../shared/models/models';
import { ENV_CONFIG } from '../../../core/seanhaddock/app-config';

/** Die möglichen Sortierrichtungen */
export type SortOrder = 'asc' | 'desc';

/**
 * Der AuftragService interagiert mit der API, um die Aufträge zu
 * verwalten
 */
@Injectable({
  providedIn: 'root',
})
export class AuftragService {
  static MAX_AUFTRAEGE_PER_PAGE = 10;
  appConfig = inject(ENV_CONFIG);
  static dtoToModel(auftrag: GutachtenauftragDto): Gutachtenauftrag {
    return {
      ...auftrag,
      gutachtenstatus: {
        value: auftrag.gutachtenstatus?auftrag.gutachtenstatus.status:'neu',
        label: gutachtenstatusToHumanReadable('neu'),
        changedOn: auftrag.gutachtenstatus?.changedOn,
      },
    };
  }

  constructor(
    private apiClient: GutachtenauftragApiClient
  ) {
    this.apiClient.configuration.basePath =
      this.appConfig.apiUrl;
    console.log('apiUrl:', this.apiClient.configuration.basePath);
  }

  /**
   * Hole einen Gutachtenauftrag
   *
   * @param id - die Id des Auftrags, der zu holen ist
   */
  getAuftrag(id: string): Observable<Gutachtenauftrag | null> {
    return this.apiClient
      .getGutachtenauftragById(id, '', '', '', 'response')
      .pipe(
        map((response) => {
          if (response.body === null) {
            console.error(
              'Body ist null, obwohl es keinen Status Fehler vom Server gab',
            );

            return null;
          }

          return AuftragService.dtoToModel(response.body);
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

  /**
   * Hole eine AuftragCollection, mit der eine Paginierung, Sortierung und
   * Filterung umgesetzt werden kann
   *
   * @param filter - die Filter, die auf die Aufträge angewendet werden sollen
   * @param itemsProSeite - die Anzahl an Aufträgen pro Seite
   * @param sortOrder - die Sortierrichtung der Aufträge
   */
  getAuftraege({
    filter = [],
    itemsProSeite,
    sortOrder,
  }: {
    filter?: GutachtenstatusFilter;
    itemsProSeite?: number;
    sortOrder?: SortOrder;
  } = {}): Observable<AuftragCollection> {
    // Die API macht eine Paginierung im Backend. Wir haben aber besprochen,
    // dass wir erstmal versuchen alles im Frontend zu machen. Deswegen werden
    // hier offset und limit gehardcoded
    return this.apiClient.getGutachtenauftraege('', '', '', 0, 9000).pipe(
      map((liste) => {
        return new AuftragCollection({
          auftraege: liste.auftraege.map(AuftragService.dtoToModel),
          filter,
          itemsProSeite: itemsProSeite,
          sortOrder: sortOrder,
        });
      }),
    );
  }
}

/**
 * Wandle den Status des Gutachtenauftrags aus der API in ein Menschen-lesbares
 * Label um
 *
 * @param status - der Statustext der API
 */
function gutachtenstatusToHumanReadable(
  status: GutachtenstatusDto.StatusEnum,
): string {
  switch (status) {
    case 'abgeschlossen':
      return 'Abgeschlossen';
    case 'einbestellt':
      return 'Einbestellt';
    case 'in_bearbeitung':
      return 'In Bearbeitung';
    case 'neu':
      return 'Neu';
    case 'storniert':
      return 'Storniert';
    default:
      console.error(`Unbekannter Gutachtenstatus: ${status}`);
      return 'Unbekannter Status';
  }
}

/**
 * Die AuftragCollection cached die Gutachtenaufträge und ermöglicht die
 * Paginierung, Filterung sowie die Sortierung
 */
export class AuftragCollection {
  /** Die gecacheden Aufträge */
  private auftraege: Gutachtenauftrag[];

  /** Die Filter, die auf die Aufträge angewendet werden */
  private filter: GutachtenstatusFilter = [];

  /** Die Sortierreihenfolge des Auftragsdatums */
  private sortOrder: SortOrder = 'desc';

  /** Die Anzahl an Aufträgen pro Seite */
  private itemsProSeite = AuftragService.MAX_AUFTRAEGE_PER_PAGE;

  /**
   * @param param
   * @param param.auftraege - die Gesamtheit an Aufträgen
   * @param param.filter - die Filter, die auf die Aufträge angewendet werden
   * @param param.itemsProSeite - die Anzahl an Items pro Seite
   * @param param.sortOrder - die Sortierrichtung der Aufträge
   */
  constructor({
    auftraege,
    filter = [],
    sortOrder = 'desc',
  }: {
    auftraege: Gutachtenauftrag[];
    filter?: GutachtenstatusFilter;
    itemsProSeite?: number;
    sortOrder?: SortOrder;
  }) {
    this.auftraege = auftraege;
    this.setFilter(filter);
    this.setSortOrder(sortOrder);
  }

  getAuftragscount(): number {
    return this.getFilteredAuftraege().length;
  }

  /**
   * Hole die Aufträge für die Seite
   *
   * @param pageNr - die Seite, für die die Aufträge zu holen sind
   */
  getAuftraegeForPage(pageNr: number) {
    const filteredAuftraege = this.getFilteredAuftraege();
    const sortedAuftraege = this.getSortedAuftraege(filteredAuftraege);

    return sortedAuftraege.slice(
      this.itemsProSeite * (pageNr - 1),
      this.itemsProSeite * pageNr,
    );
  }

  /**
   * Hole die Anzahl an Items pro Seite
   */
  getItemsProSeite(): number {
    return this.itemsProSeite;
  }

  /**
   * Hole die maximale Seitenanzahl für die aktuelle Auftragsliste
   */
  getMaxPageCount(): number {
    const filteredAuftraege = this.getFilteredAuftraege();

    return Math.ceil(filteredAuftraege.length / this.itemsProSeite);
  }

  /**
   * Setze die Filter, die auf die Aufräge angewendet werden sollen
   *
   * @param filter - die Filter, die gesetzt werden
   */
  setFilter(filter: GutachtenstatusFilter): this {
    this.filter = filter;

    return this;
  }

  /**
   * Hole die Aufträge unter Berücksichtgung der aktuellen Filter
   */
  private getFilteredAuftraege(): Gutachtenauftrag[] {
    return this.filter.length === 0
      ? this.auftraege
      : this.auftraege.filter((a) => {
          return this.filter.includes(a.gutachtenstatus.value);
        });
  }

  /**
   * Setzt die gewünschte Sortierreihenfolge
   *
   * @param sortOrder - 'asc' oder 'desc'
   */
  setSortOrder(sortOrder: SortOrder): this {
    this.sortOrder = sortOrder;
    return this;
  }

  /**
   * sortiere die Aufträge nach dem Auftragsdatum
   *
   * @private
   * @param auftraege - die Liste der Aufträge
   */
  private getSortedAuftraege(
    auftraege: Gutachtenauftrag[],
  ): Gutachtenauftrag[] {
    const order = this.sortOrder;

    const sorting = (a: Gutachtenauftrag, b: Gutachtenauftrag) => {
      // hier nur nach Auftragsdatum sortieren
      const key: keyof Gutachtenauftrag = 'auftragsdatum';
      const criteriaA = a[key];
      const criteriaB = b[key];

      return order === 'asc'
        ? criteriaA.localeCompare(criteriaB)
        : criteriaB.localeCompare(criteriaA);
    };

    return auftraege.sort(sorting);
  }
}
