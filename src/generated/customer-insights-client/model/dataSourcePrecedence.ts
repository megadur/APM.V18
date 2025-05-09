/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DataSource } from './dataSource';


/**
 * The data source precedence is a way to know the precedence of each data source.
 */
export interface DataSourcePrecedence { 
    dataSource?: DataSource;
    /**
     * the precedence value.
     */
    precedence?: number;
}

