import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";

export default function useGroup() {
  const { api } = useAxios();
  const {
    data: groups,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const data = await api.get("/api/group");
      return data.results;
    },
  });
  return {
    groups,
    isLoading,
    refetch,
  };
}
