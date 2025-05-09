/**
 * Customer Credit API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CreateorchangestoreconfigurationRequest1NotificationsSettings } from './createorchangestoreconfigurationRequest1NotificationsSettings';


export interface CreateorchangestoreconfigurationRequest1 { 
    automaticCheckingAccountCreationEnabled: boolean;
    dailyInterestRate: string;
    defaultCreditValue: string;
    invoicePostponementLimit: string;
    maxPostponementDays: string;
    maxPreAuthorizationGrowthRate: string;
    myCreditsEnabled: boolean;
    notificationsSettings?: CreateorchangestoreconfigurationRequest1NotificationsSettings;
    postponementEnabled: boolean;
    taxRate: string;
    toleranceEnabled: boolean;
}

