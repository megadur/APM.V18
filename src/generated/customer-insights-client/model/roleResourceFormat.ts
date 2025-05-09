/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Role } from './role';


/**
 * The role resource format.
 */
export interface RoleResourceFormat { 
    properties?: Role;
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

