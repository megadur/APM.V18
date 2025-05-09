/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { LinkResourceFormat } from './linkResourceFormat';


/**
 * The response of list link operation.
 */
export interface LinkListResult { 
    /**
     * Link to the next set of results.
     */
    nextLink?: string;
    /**
     * Results of the list operation.
     */
    value?: Array<LinkResourceFormat>;
}

