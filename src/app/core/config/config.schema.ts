import { z } from 'zod';

// Consolidating all found config properties into a single schema
const configSchema = z.object({
  // From ayyash, seanhaddock, iamprovidence, zod
  apiUrl: z.string().url().optional(),

  // From SaikiranHegde, used in bittucumar's interceptor
  userServiceUrl: z.string().url().optional(),

  // From drv
  apiUrlGutachten: z.string().url().optional(),
  apiUrlUser: z.string().url().optional(),

  // From drv
  xOrgId: z.string().optional(),
  xUserId: z.string().optional(),
  xGutachterId: z.string().optional(),

  // From SaikiranHegde
  features: z.record(z.boolean()).optional(),

  // From iamprovidence
  enableBetaFeatures: z.boolean().optional(),
});

/**
 * The type of the application configuration object.
 */
export type AppConfig = z.infer<typeof configSchema>;

/**
 * Validates a configuration object against the schema.
 * @param source The unknown object to validate.
 * @returns A Zod validation result.
 */
export function validateConfig(source: unknown) {
  return configSchema.safeParse(source);
}
