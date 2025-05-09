/**
 * ArzQaWeb API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UserViewModel { 
    id?: string | null;
    userName: string;
    fullName?: string | null;
    email: string;
    jobTitle?: string | null;
    phoneNumber?: string | null;
    configuration?: string | null;
    isEnabled?: boolean;
    isLockedOut?: boolean;
    roles?: Array<string> | null;
}

