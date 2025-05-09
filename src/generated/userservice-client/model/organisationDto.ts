/**
 * UserService
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AddresseDto } from './addresseDto';


export interface OrganisationDto { 
    /**
     * UUID type
     */
    orgId: string;
    /**
     * IK-Nummer der Organisation
     */
    ik?: string;
    /**
     * KTAN ist die DRV-uebergreifende eindeutige Nummer des Traegers
     */
    ktan?: string;
    /**
     * Praxisname Zeile 1
     */
    institutionsname1?: string;
    /**
     * Praxisname Zeile 2
     */
    institutionsname2?: string;
    zusatz?: string;
    adresse: AddresseDto;
}

