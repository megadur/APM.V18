import { z } from 'zod';

const schema = z.object({
  apiUrlGutachten: z.string(),
  apiUrlUser: z.string(),
  xOrgId: z.string().optional(),
  xUserId: z.string().optional(),
  xGutachterId: z.string().optional(),
});

export type ConfigDTO = z.infer<typeof schema>;

export function parseDTO(source: unknown) {
  return schema.safeParse(source);
}
