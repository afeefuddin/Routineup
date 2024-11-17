import { z } from "zod";
import { subjectSchema } from "./subject";

const lectureSchema = z.object({
  topic: z.string(),
  description: z.string(),
  start_time: z.string(),
  end_time: z.nullable(z.string().optional()),
  public_id: z.string(),
});

const lectureWithSubjectSchema = lectureSchema.extend({
  subject: subjectSchema,
});

export type LectureWithSubject = z.infer<typeof lectureWithSubjectSchema>;

export type Lecture = z.infer<typeof lectureSchema>;

export { lectureSchema, lectureWithSubjectSchema };
