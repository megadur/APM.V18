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
import { GetImageUploadUrlInput } from '../model/getImageUploadUrlInput';
// @ts-ignore
import { ImageDefinition } from '../model/imageDefinition';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { BaseService } from '../api.base.service';



@Injectable({
  providedIn: 'root'
})
export class ImagesService extends BaseService {

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string|string[], @Optional() configuration?: Configuration) {
        super(basePath, configuration);
    }

    /**
     * Gets data image upload URL.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param parameters Parameters supplied to the GetUploadUrlForData operation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public imagesGetUploadUrlForData(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<ImageDefinition>;
    public imagesGetUploadUrlForData(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<ImageDefinition>>;
    public imagesGetUploadUrlForData(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<ImageDefinition>>;
    public imagesGetUploadUrlForData(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling imagesGetUploadUrlForData.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling imagesGetUploadUrlForData.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling imagesGetUploadUrlForData.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling imagesGetUploadUrlForData.');
        }
        if (parameters === null || parameters === undefined) {
            throw new Error('Required parameter parameters was null or undefined when calling imagesGetUploadUrlForData.');
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

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/images/getDataImageUploadUrl`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<ImageDefinition>('post', `${basePath}${localVarPath}`,
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
     * Gets entity type (profile or interaction) image upload URL.
     * @param resourceGroupName The name of the resource group.
     * @param hubName The name of the hub.
     * @param apiVersion Client Api Version.
     * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
     * @param parameters Parameters supplied to the GetUploadUrlForEntityType operation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public imagesGetUploadUrlForEntityType(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<ImageDefinition>;
    public imagesGetUploadUrlForEntityType(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<ImageDefinition>>;
    public imagesGetUploadUrlForEntityType(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<ImageDefinition>>;
    public imagesGetUploadUrlForEntityType(resourceGroupName: string, hubName: string, apiVersion: string, subscriptionId: string, parameters: GetImageUploadUrlInput, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (resourceGroupName === null || resourceGroupName === undefined) {
            throw new Error('Required parameter resourceGroupName was null or undefined when calling imagesGetUploadUrlForEntityType.');
        }
        if (hubName === null || hubName === undefined) {
            throw new Error('Required parameter hubName was null or undefined when calling imagesGetUploadUrlForEntityType.');
        }
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling imagesGetUploadUrlForEntityType.');
        }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling imagesGetUploadUrlForEntityType.');
        }
        if (parameters === null || parameters === undefined) {
            throw new Error('Required parameter parameters was null or undefined when calling imagesGetUploadUrlForEntityType.');
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

        let localVarPath = `/subscriptions/${this.configuration.encodeParam({name: "subscriptionId", value: subscriptionId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/resourceGroups/${this.configuration.encodeParam({name: "resourceGroupName", value: resourceGroupName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/providers/Microsoft.CustomerInsights/hubs/${this.configuration.encodeParam({name: "hubName", value: hubName, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/images/getEntityTypeImageUploadUrl`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<ImageDefinition>('post', `${basePath}${localVarPath}`,
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

}
