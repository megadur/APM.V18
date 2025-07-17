type Filter = unknown[];

export type SortOrder = 'asc' | 'desc';

export abstract class Collection<T> {
  protected items: T[];
  protected filter: Filter;
  protected sortOrder: SortOrder;
  protected itemsProSeite: number;
  protected searchTerm: string;

  /**
   * @param param
   * @param param.items - die Gesamtheit an Itemsn
   * @param param.filter - die Filter, die auf die Items angewendet werden
   * @param param.itemsProSeite - die Anzahl an Items pro Seite
   * @param param.searchTerm - Der Suchbegriff, mit dem die Auftraege durchsucht werden sollen
   * @param param.sortOrder - die Sortierrichtung der Items
   */
  constructor({
    items,
    filter,
    itemsProSeite,
    searchTerm,
    sortOrder,
  }: {
    items: T[];
    filter: Filter;
    searchTerm: string;
    itemsProSeite: number;
    sortOrder: SortOrder;
  }) {
    this.items = items;
    this.searchTerm = searchTerm;
    this.sortOrder = sortOrder;
    this.itemsProSeite = itemsProSeite;
    this.filter = filter;
  }

  getItemCount(): number {
    return this.getFilteredItems().length;
  }

  getItems() {
    return this.getSortedItems(this.getFilteredItems());
  }

  /**
   * Hole die Aufträge für die Seite
   *
   * @param pageNr - die Seite, für die die Aufträge zu holen sind
   */
  getItemsForPage(pageNr: number) {
    if (pageNr <= 0) {
      console.warn('Die PageNr ist kleiner als 1!');
      return [];
    }

    const filteredItems = this.getFilteredItems();
    const sortedItems = this.getSortedItems(filteredItems);

    return sortedItems.slice(
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
   *
   * @returns - the maximale Seitenzahl für die Paginierung
   */
  getMaxPageCount(): number {
    const filteredItems = this.getFilteredItems();

    return Math.ceil(filteredItems.length / this.itemsProSeite);
  }

  /**
   * Setze die Filter, die auf die Aufräge angewendet werden sollen
   *
   * @param filter - die Filter, die gesetzt werden
   */
  setFilter(filter: Filter): this {
    this.filter = filter;

    return this;
  }

  /**
   * Setze die Anzahl an Items pro Seite
   *
   * @param itemsProSeite
   */
  setItemsProSeite(itemsProSeite: number): this {
    if (itemsProSeite <= 0) {
      console.warn('Die itemsProSeite ist kleiner als 0!');
      itemsProSeite = 10;
    }

    this.itemsProSeite = itemsProSeite;

    return this;
  }

  /**
   * Setze den Suchbegriff, der auf die Aufträge angewendet werden sollte
   *
   * @param searchTerm - der Suchbegriff, der gesetzt werden soll
   */
  setSearchTerm(searchTerm: string): this {
    this.searchTerm = searchTerm.toLowerCase().trim();

    return this;
  }

  /**
   * Setzt die gewünschte Sortierreihenfolge
   *
   * @param sortOrder
   */
  setSortOrder(sortOrder: SortOrder): this {
    this.sortOrder = sortOrder;

    return this;
  }

  /**
   * Hole die Interms unter Berücksichtgung der aktuellen Filter und Suche
   */
  protected getFilteredItems(): T[] {
    return this.items.filter((item) => this.isFilteredItem(item));
  }

  /**
   * Sortiere die Items
   *
   * @param items - die Liste der Items
   *
   * @returns - die sortierten Items
   */
  protected getSortedItems(items: T[]): T[] {
    return [...items].sort((a, b) => this.compareItems(a, b));
  }

  /**
   * Bestimmte, ob ein Item dem Filtern enstpricht.
   *
   * @param item - das zu prüfende Item
   *
   * @returns - wie Array::filter; true falls das Item den Filtern entspricht.
   */
  protected abstract isFilteredItem(item: T): boolean;

  /**
   * Vergleiche 2 Items
   *
   * @param item1
   * @param item2
   *
   * @returns
   */
  protected abstract compareItems(item1: T, item2: T): number;
}
