import { DokumentMetaDatenCollection } from './dokument-meta-daten-collection';
import { DocumentMetadataDto } from '../../../api/gutachtenportal/v1';

describe('DokumentMetaDatenCollection', () => {
  const items: DocumentMetadataDto[] = [
    { filename: 'Alpha.pdf' } as DocumentMetadataDto,
    { filename: 'beta.docx' } as DocumentMetadataDto,
    { filename: 'Gamma.txt' } as DocumentMetadataDto,
  ];

  it('should initialize with provided items', () => {
    const collection = new DokumentMetaDatenCollection({ items });
    expect(collection.items.length).toBe(3);
    expect(collection.items[0].filename).toBe('Alpha.pdf');
  });

  it('should sort items ascending by filename by default', () => {
    const collection = new DokumentMetaDatenCollection({ items });
    const sorted = [...collection.items].sort((a, b) =>
      collection['compareItems'](a, b)
    );
    expect(sorted.map(i => i.filename)).toEqual(['Alpha.pdf', 'Gamma.txt', 'beta.docx']);
  });

  it('should sort items descending by filename', () => {
    const collection = new DokumentMetaDatenCollection({ items, sortOrder: 'desc' });
    const sorted = [...collection.items].sort((a, b) =>
      collection['compareItems'](a, b)
    );
    expect(sorted.map(i => i.filename)).toEqual(['beta.docx', 'Gamma.txt', 'Alpha.pdf']);
  });

  it('should filter items by searchTerm (case-insensitive)', () => {
    const collection = new DokumentMetaDatenCollection({ items, searchTerm: 'beta' });
    const filtered = collection.items.filter(item => collection['isFilteredItem'](item));
    expect(filtered.length).toBe(1);
    expect(filtered[0].filename).toBe('beta.docx');
  });

  it('should return all items if searchTerm is empty', () => {
    const collection = new DokumentMetaDatenCollection({ items, searchTerm: '' });
    const filtered = collection.items.filter(item => collection['isFilteredItem'](item));
    expect(filtered.length).toBe(3);
  });

  it('should not filter items if searchTerm does not match', () => {
    const collection = new DokumentMetaDatenCollection({ items, searchTerm: 'xyz' });
    const filtered = collection.items.filter(item => collection['isFilteredItem'](item));
    expect(filtered.length).toBe(0);
  });
});
