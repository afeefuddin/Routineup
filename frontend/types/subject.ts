import { z } from "zod";
import { groupSchema } from "./group";

const subjectSchema = z.object({
  completed: z.boolean(),
  groups: z.array(groupSchema),
  name: z.string(),
  public_id: z.string(),
  subject_code: z.string(),
});

export type Subject = z.infer<typeof subjectSchema>;

export { subjectSchema };
