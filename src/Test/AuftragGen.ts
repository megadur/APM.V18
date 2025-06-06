import { faker } from '@faker-js/faker';
import { AuftragService } from '../app/features/auftrag/service/auftrag.service';
import { Gutachtenauftrag } from '../app/shared/models/models';
import { GutachtenauftragDto, KontaktDto, GutachtenstatusDto, AddresseDto, OrganisationDto, GutachterDto } from '../generated/gutachtenservice-client';


const ListOfOrgs = [...new Array(10)].map(() => generateOrganisation());
const ListOfGutachter = [...new Array(10)].map(() => generateGutachter());

/**
 * Erstelle ein minimales Gutachtenauftrag zum Testen
 */

export function generateAuftrag(): Gutachtenauftrag {
  return AuftragService.dtoToModel(generateAuftragDto());
}

/**
 * Erstelle ein minimales GutachtenauftragDto zum Testen
 */

export function generateAuftragDto(
  o: Partial<GutachtenauftragDto> = {},
): GutachtenauftragDto {
  return {
    auftragsId: faker.string.uuid(),
    proband: {
      geburtsdatum: faker.date.birthdate().toISOString(),
      name: faker.person.lastName(),
      vorname: faker.person.firstName(),
      vsnr: faker.string.alphanumeric({ length: 12 }),
      adresse: generateAdress(),
      kontakte: [generateKontakt()],
    },
    gutachter:
      ListOfGutachter[
        faker.number.int({ min: 0, max: ListOfGutachter.length - 1 })
      ],
    auftraggeber:
      ListOfOrgs[faker.number.int({ min: 0, max: ListOfOrgs.length - 1 })],
    kennzeichen1: faker.lorem.sentence(5),
    kennzeichen2: faker.lorem.sentence(5),
    gutachtenstatus: generateGutachtenStatus(),
    auftragsdatum: faker.date.past().toISOString(),
    eingangsdatum: faker.date.past().toISOString(),
    bereitstellungsdatum: faker.date.past().toISOString(),
    einbestelldatum: faker.date.past().toISOString(),
    ...o,
  };
}

function generateKontakt(): KontaktDto {
  const n = Math.random();

  if (n >= 0.5) {
    return {
      typ: 'Email',
      wert: faker.internet.email(),
      anmerkung: faker.lorem.lines(1),
    };
  } else {
    return {
      typ: 'Telefon',
      wert: faker.phone.number(),
      anmerkung: faker.lorem.lines(1),
    };
  }
}

function generateGutachtenStatus(): GutachtenstatusDto {
  const statOptions = [
    'neu',
    'einbestellt',
    'in_bearbeitung',
    'abgeschlossen',
    'storniert',
  ] as const;

  return {
    status:
      statOptions[faker.number.int({ min: 0, max: statOptions.length - 1 })],
    changedOn: faker.date.past().toISOString(),
  };
}

function generateAdress(): AddresseDto {
  return {
    ort: faker.location.city(),
    strasse: faker.location.street(),
    hausnummer: faker.location.buildingNumber(),
    land: faker.location.country(),
    plz: faker.location.zipCode(),
    addresszusatz: faker.location.secondaryAddress(),
    postfach: faker.location.zipCode(),
  };
}

function generateOrganisation(): OrganisationDto {
  return {
    orgId: faker.string.uuid(),
    adresse: generateAdress(),
    ik: faker.string.numeric({ length: 2 }),
    ktan: faker.string.alphanumeric(),
    institutionsname1: faker.company.name(),
    institutionsname2: faker.company.name(),
    zusatz: faker.lorem.words(6),
  };
}

function generateGutachter(): GutachterDto {
  return {
    id: faker.string.uuid(),
    orgId:
      ListOfOrgs[faker.number.int({ min: 0, max: ListOfOrgs.length - 1 })]
        .orgId,
  };
}

