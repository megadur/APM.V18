import { GutachterDto } from '../../../generated/userservice-client';

export function createGutachterDto() {
    const newLocal = {
        id: 1,
        name: {
            nachname: 'Gutachter',
            vorname: 'Max',
            anrede: 'Herr',
            titel: 'Dr.',
        },
        zuordnung: [{ ktan: '12345', gutachterId: '67890' }],
        organisation: { id: 1, orgId: 'org-123', adresse: {} },
        rolle: ['gutachter'],
        lanr: '123456789',
        kontakt: { typ: 'Email', wert: '', anmerkung: '' },
        fachrichtung: undefined,
        adressen: [],
        nutzerstatus: GutachterDto.NutzerstatusEnum.Aktiviert,
        nutzerstatusText: null,
    } as GutachterDto;
    const mockGutachter: GutachterDto = newLocal;
    return mockGutachter;
}
