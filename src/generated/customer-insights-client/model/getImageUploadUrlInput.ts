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
 * Input type for getting image upload url.
 */
export interface GetImageUploadUrlInput { 
    /**
     * Type of entity. Can be Profile or Interaction.
     */
    entityType?: string;
    /**
     * Name of the entity type.
     */
    entityTypeName?: string;
    /**
     * Relative path of the image.
     */
    relativePath?: string;
}

