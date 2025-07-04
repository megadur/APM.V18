export class DokumentMetaDatenCollection extends Collection<DocumentMetadataDto> {
  constructor({
    items,
    searchTerm = '',
    sortOrder = 'asc',
  }: {
    items: DocumentMetadataDto[];
    searchTerm?: string;
    sortOrder?: SortOrder;
  }) {
    super({
      items,
      filter: [],
      itemsProSeite: Infinity,
      searchTerm,
      sortOrder,
    });
  }

  protected override compareItems(
    itemA: DocumentMetadataDto,
    itemB: DocumentMetadataDto,
  ): number {
    const a = itemA.filename;
    const b = itemB.filename;

    return this.sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
  }

  protected override isFilteredItem(item: DocumentMetadataDto): boolean {
    return (
      this.searchTerm.length === 0 ||
      item.filename.toLowerCase().includes(this.searchTerm)
    );
  }
}
