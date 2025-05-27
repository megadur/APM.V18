import { GutachterMapper } from './gutachter.mapper';

import { Gutachter } from '../../../shared/models/models';

import {
  GutachterDto,
  KontaktDtoTypEnum,
  NutzerprofilDtoNutzerstatusEnum,
} from '../../../../generated/userservice-client';

describe('GutachterMapper', () => {
  let mapper: GutachterMapper;

  beforeEach(() => {
    mapper = new GutachterMapper();
  });

  const gutachter: Gutachter = {
    id: '1',
    orgId: 'ORG123',
    adressen: [{ strasse: 'Teststr.', plz: '12345', ort: 'Teststadt' }],
    anrede: 'Herr',
    kontakte: [
      {
        typ: KontaktDtoTypEnum.Telefon,
        wert: '0123456789',
        anmerkung: 'Büro',
      },
    ],
    nachname: 'Mustermann',
    titel: 'Dr.',
    vorname: 'Max',
    rollen: ['gutachter', 'admin'],
    created: '2023-01-01T12:00:00Z',
    lastLogin: '2023-01-02T12:00:00Z',
    status: 'active',
  };

  const gutachterDto: GutachterDto = {
    name: {
      nachname: 'Mustermann',
      vorname: 'Max',
      anrede: 'Herr',
      titel: 'Dr.',
    },
    test_rolle: 'test_rolle',
    organisation: {
      orgId: 'ORG123',
      institutionsname1: '',
      institutionsname2: '',
      ik: '',
      ktan: '',
      zusatz: '',
      adresse: {},
    },
    adressen: [{ strasse: 'Teststr.', plz: '12345', ort: 'Teststadt' }],
    rollen: ['gutachter', 'admin'],
    kontakt: {
      typ: KontaktDtoTypEnum.Telefon,
      wert: '0123456789',
      anmerkung: 'Büro',
    },
    letzterLogin: {
      ipV4: '',
      loginTimestamp: '2023-01-02T12:00:00Z',
      userAgent: '',
    },
    nutzerstatus: NutzerprofilDtoNutzerstatusEnum.Aktiviert,
  };

  it('should map Gutachter to GutachterDto (toDto)', () => {
    const dto = mapper.toDto(gutachter);
    expect(dto.name.nachname).toBe('Mustermann');
    expect(dto.name.vorname).toBe('Max');
    expect(dto.name.anrede).toBe('Herr');
    expect(dto.name.titel).toBe('Dr.');
    expect(dto.organisation.orgId).toBe('ORG123');
    expect(dto.adressen.length).toBe(1);
    expect(dto.kontakt.typ).toBe(KontaktDtoTypEnum.Telefon);
    expect(dto.kontakt.wert).toBe('0123456789');
    expect(dto.kontakt.anmerkung).toBe('Büro');
    expect(dto.nutzerstatus).toBe(NutzerprofilDtoNutzerstatusEnum.Aktiviert);
  });

  it('should map Gutachter with missing fields to GutachterDto with defaults', () => {
    const minimal: Gutachter = {
      id: '',
      orgId: '',
      adressen: [],
      anrede: '',
      kontakte: [],
      nachname: '',
      titel: '',
      vorname: '',
      rollen: [],
      created: '',
      lastLogin: '',
      status: 'locked',
    };
    const dto = mapper.toDto(minimal);
    expect(dto.name.nachname).toBe('');
    expect(dto.organisation.orgId).toBe('');
    expect(dto.kontakt.typ).toBe(KontaktDtoTypEnum.Email);
    expect(dto.kontakt.wert).toBe('');
    expect(dto.kontakt.anmerkung).toBe('');
  });

  it('should map array of Gutachter to array of GutachterDto (toDtoArray)', () => {
    const result = mapper.toDtoArray([gutachter]);
    expect(result.length).toBe(1);
    expect(result[0].name.nachname).toBe('Mustermann');
  });

  it('should map GutachterDto to Gutachter (toModel)', () => {
    const model = mapper.toModel(gutachterDto);
    expect(model.orgId).toBe('ORG123');
    expect(model.nachname).toBe('Mustermann');
    expect(model.kontakte && model.kontakte[0]?.typ).toBe(
      KontaktDtoTypEnum.Telefon,
    );
    expect(model.kontakte && model.kontakte[0]?.wert).toBe('0123456789');
    expect(model.kontakte && model.kontakte[0]?.anmerkung).toBe('Büro');
    expect(model.rollen).toContain('gutachter');
    expect(model.status).toBe('active');
    expect(model.lastLogin).toBe('2023-01-02T12:00:00Z');
  });

  it('should map GutachterDto with locked status to Gutachter with status "locked"', () => {
    const lockedDto = {
      ...gutachterDto,
      nutzerstatus: NutzerprofilDtoNutzerstatusEnum.Gesperrt,
    };
    const model = mapper.toModel(lockedDto);
    expect(model.status).toBe('locked');
  });

  it('should map array of GutachterDto to array of Gutachter (toModelArray)', () => {
    const result = mapper.toModelArray([gutachterDto]);
    expect(result.length).toBe(1);
    expect(result[0].nachname).toBe('Mustermann');
  });

  it('should filter and map GutachterDto array (toModelArrayWithFilter)', () => {
    const dtos: GutachterDto[] = [
      {
        ...gutachterDto,
        name: { ...gutachterDto.name, nachname: 'A' },
        rollen: ['gutachter'],
        kontakt: gutachterDto.kontakt,
        organisation: gutachterDto.organisation,
        adressen: [],
        letzterLogin: gutachterDto.letzterLogin,
        nutzerstatus: NutzerprofilDtoNutzerstatusEnum.Aktiviert,
        test_rolle: 'test_rolle',
      },
      {
        ...gutachterDto,
        name: { ...gutachterDto.name, nachname: 'B' },
        rollen: ['admin'],
        kontakt: gutachterDto.kontakt,
        organisation: gutachterDto.organisation,
        adressen: [],
        letzterLogin: gutachterDto.letzterLogin,
        nutzerstatus: NutzerprofilDtoNutzerstatusEnum.Aktiviert,
        test_rolle: 'test_rolle',
      },
    ];
    const result = mapper.toModelArrayWithFilter(dtos, (dto) =>
      dto.rollen.includes('gutachter'),
    );
    expect(result.length).toBe(1);
    expect(result[0].nachname).toBe('A');
  });
});
