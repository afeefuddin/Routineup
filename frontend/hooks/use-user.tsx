"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";

export default function useUser() {
  const { api, token, isGettingToken } = useAxios();
  const {
    data: user,
    isLoading,
    failureCount,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api?.get("/api/user");
      return response;
    },
    enabled: !isGettingToken,
  });
  return {
    user,
    isLoading: isLoading && !token,
    isError: failureCount > 0,
    isPending,
  };
}
