import { Collection, type SortOrder } from './collection';

class BasicStringCollection extends Collection<string> {
  constructor({
    items,
    filter = [],
    itemsProSeite = Infinity,
    searchTerm = '',
    sortOrder = 'desc',
  }: {
    items: string[];
    filter?: string[];
    itemsProSeite?: number;
    searchTerm?: string;
    sortOrder?: SortOrder;
  }) {
    super({
      items,
      filter,
      itemsProSeite,
      searchTerm,
      sortOrder,
    });
  }

  protected override compareItems(item1: string, item2: string): number {
    return item1.localeCompare(item2);
  }

  protected override isFilteredItem(item: string): boolean {
    const matchesFilter =
      this.filter.length === 0 || this.filter.includes(item);
    const matchesSearchTerm =
      this.searchTerm.length === 0 || item.includes(this.searchTerm);

    return matchesSearchTerm && matchesFilter;
  }
}

describe('Collection', () => {
  it('sollte alle Items zurückgeben', async () => {
    const items = ['1', '2', '3'];
    const collection = new BasicStringCollection({ items });

    expect(collection.getItemsForPage(1)).toEqual(items);
  });

  it('sollte die Paginierung ermöglichen', async () => {
    const items = ['1', '2', '3'];
    const collection = new BasicStringCollection({ items, itemsProSeite: 1 });

    expect(collection.getItemsForPage(1)).toEqual(['1']);
    expect(collection.getItemsForPage(2)).toEqual(['2']);
    expect(collection.getItemsForPage(3)).toEqual(['3']);
    expect(collection.getItemsForPage(4)).toEqual([]);
    expect(collection.getItemsForPage(-1)).toEqual([]);
  });

  it('sollte die maximale Seitenanzahl kalkulieren', async () => {
    const items = ['1', '2', '3'];
    const collection = new BasicStringCollection({ items, itemsProSeite: 1 });

    expect(collection.getMaxPageCount()).toEqual(3);

    collection.setItemsProSeite(2);
    expect(collection.getMaxPageCount()).toEqual(2);

    collection.setItemsProSeite(5);
    expect(collection.getMaxPageCount()).toEqual(1);

    collection.setItemsProSeite(-1);
    expect(collection.getMaxPageCount()).toEqual(1);
  });

  it('sollte alle Items holen', () => {
    const items = ['1', '5', '2', '4', '3'];
    const collection = new BasicStringCollection({
      items,
      itemsProSeite: 1,
    });

    expect(collection.getItems()).toEqual(['1', '2', '3', '4', '5']);
  });
});
