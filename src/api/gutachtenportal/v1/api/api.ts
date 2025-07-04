export * from './dokumente.apiclient';
import { DokumenteApiClient } from './dokumente.apiclient';
export * from './gutachten.apiclient';
import { GutachtenApiClient } from './gutachten.apiclient';
export * from './gutachtenauftrag.apiclient';
import { GutachtenauftragApiClient } from './gutachtenauftrag.apiclient';
export const APIS = [DokumenteApiClient, GutachtenApiClient, GutachtenauftragApiClient];
