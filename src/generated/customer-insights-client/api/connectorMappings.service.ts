/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { ConnectorMappingListResult } from '../model/connectorMappingListResult';
// @ts-ignore
import { ConnectorMappingResourceFormat } from '../model/connectorMappingResourceFormat';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { BaseService } from '../api.base.service';



@Injectable({
  providedIn: 'root'
})
export class ConnectorMappingsService extends BaseService {

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string|string[], @Optional() configuration?: Configuration) {
        super(basePath, configuration);
    }

    /**
     * Creates a connector mapping or updates an existing connector mapping in the connector.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param connectorName The name of the connector.
     * @param mappingName The name of the connector mapping.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param parameters Parameters supplied to the CreateOrUpdate Connector Mapping operation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public connectorMappingsCreateOrUpdate(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, parameters: ConnectorMappingResourceFormat, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<ConnectorMappingResourceFormat>;
    public connectorMappingsCreateOrUpdate(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, parameters: ConnectorMappingResourceFormat, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<ConnectorMappingResourceFormat>>;
    public connectorMappingsCreateOrUpdate(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, parameters: ConnectorMappingResourceFormat, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<ConnectorMappingResourceFormat>>;
    public connectorMappingsCreateOrUpdate(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, parameters: ConnectorMappingResourceFormat, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (connectorName === null || connectorName === undefined) {
            throw new Error('Required parameter connectorName was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (mappingName === null || mappingName === undefined) {
            throw new Error('Required parameter mappingName was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }
        if (parameters === null || parameters === undefined) {
            throw new Error('Required parameter parameters was null or undefined when calling connectorMappingsCreateOrUpdate.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
          <any>apiVersion, 'api-version');

        let localVarHeaders = this.defaultHeaders;

        // authentication (azure_auth) required
        localVarHeaders = this.configuration.addCredentialToHeaders('azure_auth', 'Authorization', localVarHeaders, 'Bearer ');

        const localVarHttpHeaderAcceptSelected: string | undefined = options?.httpHeaderAccept ?? this.configuration.selectHeaderAccept([
            'application/json'
        ]);
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        const localVarHttpContext: HttpContext = options?.context ?? new HttpContext();

        const localVarTransferCache: boolean = options?.transferCache ?? true;


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/connectors/${this.configuration.encodeParam({name: "connectorName", value: connectorName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/mappings/${this.configuration.encodeParam({name: "mappingName", value: mappingName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<ConnectorMappingResourceFormat>('put', `${basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: parameters,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                ...(withCredentials ? { withCredentials } : {}),
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Deletes a connector mapping in the connector.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param connectorName The name of the connector.
     * @param mappingName The name of the connector mapping.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public connectorMappingsDelete(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext, transferCache?: boolean}): Observable<any>;
    public connectorMappingsDelete(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<any>>;
    public connectorMappingsDelete(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<any>>;
    public connectorMappingsDelete(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling connectorMappingsDelete.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling connectorMappingsDelete.');
        }
        if (connectorName === null || connectorName === undefined) {
            throw new Error('Required parameter connectorName was null or undefined when calling connectorMappingsDelete.');
        }
        if (mappingName === null || mappingName === undefined) {
            throw new Error('Required parameter mappingName was null or undefined when calling connectorMappingsDelete.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling connectorMappingsDelete.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling connectorMappingsDelete.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
          <any>apiVersion, 'api-version');

        let localVarHeaders = this.defaultHeaders;

        // authentication (azure_auth) required
        localVarHeaders = this.configuration.addCredentialToHeaders('azure_auth', 'Authorization', localVarHeaders, 'Bearer ');

        const localVarHttpHeaderAcceptSelected: string | undefined = options?.httpHeaderAccept ?? this.configuration.selectHeaderAccept([
        ]);
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        const localVarHttpContext: HttpContext = options?.context ?? new HttpContext();

        const localVarTransferCache: boolean = options?.transferCache ?? true;


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/connectors/${this.configuration.encodeParam({name: "connectorName", value: connectorName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/mappings/${this.configuration.encodeParam({name: "mappingName", value: mappingName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<any>('delete', `${basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                ...(withCredentials ? { withCredentials } : {}),
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets a connector mapping in the connector.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param connectorName The name of the connector.
     * @param mappingName The name of the connector mapping.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public connectorMappingsGet(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<ConnectorMappingResourceFormat>;
    public connectorMappingsGet(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<ConnectorMappingResourceFormat>>;
    public connectorMappingsGet(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<ConnectorMappingResourceFormat>>;
    public connectorMappingsGet(resourceGroupName: string, hubName: string, connectorName: string, mappingName: string, apiVersion: string, subscriptionId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling connectorMappingsGet.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling connectorMappingsGet.');
        }
        if (connectorName === null || connectorName === undefined) {
            throw new Error('Required parameter connectorName was null or undefined when calling connectorMappingsGet.');
        }
        if (mappingName === null || mappingName === undefined) {
            throw new Error('Required parameter mappingName was null or undefined when calling connectorMappingsGet.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling connectorMappingsGet.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling connectorMappingsGet.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
          <any>apiVersion, 'api-version');

        let localVarHeaders = this.defaultHeaders;

        // authentication (azure_auth) required
        localVarHeaders = this.configuration.addCredentialToHeaders('azure_auth', 'Authorization', localVarHeaders, 'Bearer ');

        const localVarHttpHeaderAcceptSelected: string | undefined = options?.httpHeaderAccept ?? this.configuration.selectHeaderAccept([
            'application/json'
        ]);
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        const localVarHttpContext: HttpContext = options?.context ?? new HttpContext();

        const localVarTransferCache: boolean = options?.transferCache ?? true;


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/connectors/${this.configuration.encodeParam({name: "connectorName", value: connectorName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/mappings/${this.configuration.encodeParam({name: "mappingName", value: mappingName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<ConnectorMappingResourceFormat>('get', `${basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                ...(withCredentials ? { withCredentials } : {}),
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all the connector mappings in the specified connector.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param connectorName The name of the connector.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public connectorMappingsListByConnector(resourceGroupName: string, hubName: string, connectorName: string, apiVersion: string, subscriptionId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<ConnectorMappingListResult>;
    public connectorMappingsListByConnector(resourceGroupName: string, hubName: string, connectorName: string, apiVersion: string, subscriptionId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<ConnectorMappingListResult>>;
    public connectorMappingsListByConnector(resourceGroupName: string, hubName: string, connectorName: string, apiVersion: string, subscriptionId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<ConnectorMappingListResult>>;
    public connectorMappingsListByConnector(resourceGroupName: string, hubName: string, connectorName: string, apiVersion: string, subscriptionId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling connectorMappingsListByConnector.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling connectorMappingsListByConnector.');
        }
        if (connectorName === null || connectorName === undefined) {
            throw new Error('Required parameter connectorName was null or undefined when calling connectorMappingsListByConnector.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling connectorMappingsListByConnector.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling connectorMappingsListByConnector.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
          <any>apiVersion, 'api-version');

        let localVarHeaders = this.defaultHeaders;

        // authentication (azure_auth) required
        localVarHeaders = this.configuration.addCredentialToHeaders('azure_auth', 'Authorization', localVarHeaders, 'Bearer ');

        const localVarHttpHeaderAcceptSelected: string | undefined = options?.httpHeaderAccept ?? this.configuration.selectHeaderAccept([
            'application/json'
        ]);
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        const localVarHttpContext: HttpContext = options?.context ?? new HttpContext();

        const localVarTransferCache: boolean = options?.transferCache ?? true;


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/connectors/${this.configuration.encodeParam({name: "connectorName", value: connectorName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/mappings`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<ConnectorMappingListResult>('get', `${basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                ...(withCredentials ? { withCredentials } : {}),
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

}
