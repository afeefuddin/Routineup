import { z } from "zod";

const groupSchema = z.object({
  group_name: z.string(),
  public_id: z.string(),
});

export type Group = z.infer<typeof groupSchema>;

export { groupSchema };
