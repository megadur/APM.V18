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
import { OperationListResult } from '../model/operationListResult';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { BaseService } from '../api.base.service';



@Injectable({
  providedIn: 'root'
})
export class OperationsService extends BaseService {

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string|string[], @Optional() configuration?: Configuration) {
        super(basePath, configuration);
    }

    /**
     * Lists all of the available Customer Insights REST API operations.
     * @param apiVersion Client Api Version.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public operationsList(apiVersion: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<OperationListResult>;
    public operationsList(apiVersion: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<OperationListResult>>;
    public operationsList(apiVersion: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<OperationListResult>>;
    public operationsList(apiVersion: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (apiVersion === null || apiVersion === undefined) {
            throw new Error('Required parameter apiVersion was null or undefined when calling operationsList.');
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

        let localVarPath = `/providers/Microsoft.CustomerInsights/operations`;
        const { basePath, withCredentials } = this.configuration;
        return this.httpClient.request<OperationListResult>('get', `${basePath}${localVarPath}`,
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
