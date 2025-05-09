/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InteractionResourceFormat } from './interactionResourceFormat';


/**
 * The response of list interaction operation.
 */
export interface InteractionListResult { 
    /**
     * Link to the next set of results.
     */
    nextLink?: string;
    /**
     * Results of the list operation.
     */
    value?: Array<InteractionResourceFormat>;
}

