/**
 * CustomerInsightsManagementClient
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ParticipantPropertyReference } from './participantPropertyReference';


/**
 * Describes a profile type participating in an interaction.
 */
export interface Participant { 
    /**
     * Localized descriptions.
     */
    description?: { [key: string]: string; };
    /**
     * Localized display name.
     */
    displayName?: { [key: string]: string; };
    /**
     * Participant name.
     */
    participantName: string;
    /**
     * The property references.
     */
    participantPropertyReferences: Array<ParticipantPropertyReference>;
    /**
     * Profile type name.
     */
    profileTypeName: string;
    /**
     * The role that the participant is playing in the interaction.
     */
    role?: string;
}

