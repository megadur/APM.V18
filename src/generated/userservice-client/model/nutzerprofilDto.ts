/**
 * UserService
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { LastLoginDto } from './lastLoginDto';
import { OrganisationDto } from './organisationDto';
import { AddresseDto } from './addresseDto';
import { KontaktDto } from './kontaktDto';
import { NameDto } from './nameDto';


/**
 * 
 */
export interface NutzerprofilDto { 
    test_rolle: string;
    organisation: OrganisationDto;
    name: NameDto;
    /**
     * 
     */
    rollen: Array<string>;
    /**
     * 
     */
    adressen: Array<AddresseDto>;
    kontakt: KontaktDto;
    letzterLogin?: LastLoginDto;
    /**
     * 
     */
    readonly nutzerstatus: NutzerprofilDto.NutzerstatusEnum;
    /**
     * 
     */
    settings?: { [key: string]: string; };
    /**
     * Link zum Avatar oder Default-Avatar
     */
    readonly avatar?: string;
}
export namespace NutzerprofilDto {
    export const NutzerstatusEnum = {
        Angelegt: 'angelegt',
        EmailsVerifiziert: 'emails_verifiziert',
        Aktiviert: 'aktiviert',
        Gesperrt: 'gesperrt'
    } as const;
    export type NutzerstatusEnum = typeof NutzerstatusEnum[keyof typeof NutzerstatusEnum];
}


