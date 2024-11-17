import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";
import { z } from "zod";
import { subjectSchema } from "@/types/subject";

export default function useSubjects() {
  const { api } = useAxios();
  const {
    data: subjects,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const raw_data = await api.get("/api/subjects");
      const data = z
        .object({ results: z.array(subjectSchema) })
        .parse(raw_data);
      return data.results;
    },
  });
  return {
    subjects,
    isLoading,
    refetch,
  };
}
