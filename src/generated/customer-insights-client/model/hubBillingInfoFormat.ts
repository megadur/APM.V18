/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Hub billing info.
 */
export interface HubBillingInfoFormat { 
    /**
     * The maximum number of units can be used.  One unit is 10,000 Profiles and 100,000 Interactions.
     */
    maxUnits?: number;
    /**
     * The minimum number of units will be billed. One unit is 10,000 Profiles and 100,000 Interactions.
     */
    minUnits?: number;
    /**
     * The sku name.
     */
    skuName?: string;
}

