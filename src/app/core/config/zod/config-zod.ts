import { z } from 'zod';

const schema = z.object({
  apiUrl: z.string().optional(),
});

export type ConfigDTO = z.infer<typeof schema>;

export function parseDTO(source: unknown) {
  return schema.safeParse(source);
}
