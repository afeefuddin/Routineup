"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";
import { UserDataWithEducatorSchema } from "@/types/auth";
import { z } from "zod";

export default function useUser() {
  const { api, isGettingToken } = useAxios();
  const {
    data: user,
    isLoading,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const raw_data = await api?.get("/api/user");
      const data = z
        .object({ result: UserDataWithEducatorSchema })
        .parse(raw_data);
      return data.result;
    },
    enabled: !isGettingToken,
  });
  return {
    user,
    isLoading: isLoading || isGettingToken,
    isError,
    isPending,
    refetch,
  };
}
