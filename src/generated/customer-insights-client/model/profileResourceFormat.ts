/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProfileTypeDefinition } from './profileTypeDefinition';


/**
 * The profile resource format.
 */
export interface ProfileResourceFormat { 
    properties?: ProfileTypeDefinition;
    /**
     * Resource ID.
     */
    readonly id?: string;
    /**
     * Resource name.
     */
    readonly name?: string;
    /**
     * Resource type.
     */
    readonly type?: string;
}

