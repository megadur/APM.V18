
import { GutachterDto, KontaktDto } from '../../../../generated/userservice-client';
import { Mapper } from '../../../shared/interfaces/mapper.interface';
import { Gutachter, Kontakt } from '../../../shared/models/models';

export class GutachterMapper implements Mapper<Gutachter, GutachterDto> {
  toDto(input: Gutachter): GutachterDto {
    return {
      name: {
        nachname: input.nachname ? input.nachname : '',
        vorname: input.vorname ? input.vorname : '',
        anrede: input.anrede ? input.anrede : '',
        titel: input.titel ? input.titel : '',
      },
      test_rolle: 'test_rolle',
      organisation: {
        orgId: input.orgId ? input.orgId : '',
        institutionsname1: '',
        institutionsname2: '',
        ik: '',
        ktan: '',
        zusatz: '',
        adresse: {},
      },
      adressen: input.adressen ? input.adressen : [],
      rolle: [''],
      kontakt: {
        typ:
          input.kontakte &&
          input.kontakte.length > 0 &&
          input.kontakte[0].typ !== undefined
            ? (input.kontakte[0].typ as KontaktDto.TypEnum)
            : "Email",
        wert:
          input.kontakte && input.kontakte.length > 0
            ? (input.kontakte[0].wert ?? '')
            : '',
        anmerkung:
          input.kontakte && input.kontakte.length > 0
            ? (input.kontakte[0].anmerkung ?? '')
            : '',
      },
      letzterLogin: { ipV4: '', loginTimestamp: '', userAgent: '' },
      nutzerstatus: GutachterDto.NutzerstatusEnum.Aktiviert,
      zuordnung: [],
    };
  }
  /**
   * Converts an array of Gutachter to an array of GutachterDto.
   * @param input The array of Gutachter to convert.
   * @returns The converted array of GutachterDto.
   */

  toDtoArray(input: Gutachter[]): GutachterDto[] {
    return input.map((gutachter) => this.toDto(gutachter));
  }

  toModel(input: GutachterDto): Gutachter {
    return {
      id: '',
      orgId: input.organisation.orgId,
      adressen: input.adressen,
      anrede: input.name.anrede,
      kontakte: [
        {
          typ: input.kontakt.typ,
          wert: input.kontakt.wert,
          anmerkung: input.kontakt.anmerkung,
        },
      ],
      nachname: input.name.nachname,
      titel: input.name.titel,
      vorname: input.name.vorname,
      rollen: input.rolle.filter((rolle) => rolle == 'gutachter'),
      created: input.letzterLogin?.loginTimestamp,
      lastLogin: input.letzterLogin?.loginTimestamp,
      status:
        input.nutzerstatus == GutachterDto.NutzerstatusEnum.Aktiviert
          ? 'active'
          : 'locked',
    };
  }
  toModelArray(input: GutachterDto[]): Gutachter[] {
    return input.map((gutachterDto) => this.toModel(gutachterDto));
  }

  toModelArrayWithFilter(
    input: GutachterDto[],
    filter: (gutachter: GutachterDto) => boolean,
  ): Gutachter[] {
    return input
      .filter(filter)
      .map((gutachterDto) => this.toModel(gutachterDto));
  }
}
