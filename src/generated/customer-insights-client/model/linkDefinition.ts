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
import { ParticipantPropertyReference } from './participantPropertyReference';
import { TypePropertiesMapping } from './typePropertiesMapping';


/**
 * The definition of Link.
 */
export interface LinkDefinition { 
    /**
     * Localized descriptions for the Link.
     */
    description?: { [key: string]: string; };
    /**
     * Localized display name for the Link.
     */
    displayName?: { [key: string]: string; };
    /**
     * The link name.
     */
    readonly linkName?: string;
    /**
     * The set of properties mappings between the source and target Types.
     */
    mappings?: Array<TypePropertiesMapping>;
    /**
     * Determines whether this link is supposed to create or delete instances if Link is NOT Reference Only.
     */
    operationType?: LinkDefinition.OperationTypeEnum;
    /**
     * The properties that represent the participating profile.
     */
    participantPropertyReferences: Array<ParticipantPropertyReference>;
    provisioningState?: ProvisioningState;
    /**
     * Indicating whether the link is reference only link. This flag is ignored if the Mappings are defined. If the mappings are not defined and it is set to true, links processing will not create or update profiles.
     */
    referenceOnly?: boolean;
    /**
     * Type of source entity.
     */
    sourceEntityType: LinkDefinition.SourceEntityTypeEnum;
    /**
     * Name of the source Entity Type.
     */
    sourceEntityTypeName: string;
    /**
     * Type of target entity.
     */
    targetEntityType: LinkDefinition.TargetEntityTypeEnum;
    /**
     * Name of the target Entity Type.
     */
    targetEntityTypeName: string;
    /**
     * The hub name.
     */
    readonly tenantId?: string;
}
export namespace LinkDefinition {
    export const OperationTypeEnum = {
        Upsert: 'Upsert',
        Delete: 'Delete'
    } as const;
    export type OperationTypeEnum = typeof OperationTypeEnum[keyof typeof OperationTypeEnum];
    export const SourceEntityTypeEnum = {
        None: 'None',
        Profile: 'Profile',
        Interaction: 'Interaction',
        Relationship: 'Relationship'
    } as const;
    export type SourceEntityTypeEnum = typeof SourceEntityTypeEnum[keyof typeof SourceEntityTypeEnum];
    export const TargetEntityTypeEnum = {
        None: 'None',
        Profile: 'Profile',
        Interaction: 'Interaction',
        Relationship: 'Relationship'
    } as const;
    export type TargetEntityTypeEnum = typeof TargetEntityTypeEnum[keyof typeof TargetEntityTypeEnum];
}


