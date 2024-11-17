import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";
import { z } from "zod";
import { groupSchema } from "@/types/group";

export default function useGroup() {
  const { api } = useAxios();
  const {
    data: groups,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const raw_data = await api.get("/api/group");
      const data = z.object({ results: z.array(groupSchema) }).parse(raw_data);
      return data.results;
    },
  });
  return {
    groups,
    isLoading,
    refetch,
  };
}
