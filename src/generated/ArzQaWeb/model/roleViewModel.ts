/**
 * ArzQaWeb API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PermissionViewModel } from './permissionViewModel';


export interface RoleViewModel { 
    id?: string | null;
    name: string;
    description?: string | null;
    usersCount?: number;
    permissions?: Array<PermissionViewModel> | null;
}

