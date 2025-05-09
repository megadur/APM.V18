/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProvisioningState } from './provisioningState';
import { PredictionSystemGeneratedEntities } from './predictionSystemGeneratedEntities';
import { PredictionGradesInner } from './predictionGradesInner';
import { PredictionMappings } from './predictionMappings';


/**
 * The prediction definition.
 */
export interface Prediction { 
    /**
     * Whether do auto analyze.
     */
    autoAnalyze: boolean;
    /**
     * Description of the prediction.
     */
    description?: { [key: string]: string; };
    /**
     * Display name of the prediction.
     */
    displayName?: { [key: string]: string; };
    /**
     * The prediction grades.
     */
    grades?: Array<PredictionGradesInner>;
    /**
     * Interaction types involved in the prediction.
     */
    involvedInteractionTypes?: Array<string>;
    /**
     * KPI types involved in the prediction.
     */
    involvedKpiTypes?: Array<string>;
    /**
     * Relationships involved in the prediction.
     */
    involvedRelationships?: Array<string>;
    mappings: PredictionMappings;
    /**
     * Negative outcome expression.
     */
    negativeOutcomeExpression: string;
    /**
     * Positive outcome expression.
     */
    positiveOutcomeExpression: string;
    /**
     * Name of the prediction.
     */
    predictionName?: string;
    /**
     * Primary profile type.
     */
    primaryProfileType: string;
    provisioningState?: ProvisioningState;
    /**
     * Scope expression.
     */
    scopeExpression: string;
    /**
     * Score label.
     */
    scoreLabel: string;
    systemGeneratedEntities?: PredictionSystemGeneratedEntities;
    /**
     * The hub name.
     */
    readonly tenantId?: string;
}
export namespace Prediction {
}


