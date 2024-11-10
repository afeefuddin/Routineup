"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "./use-axios";
import { UserDataWithEducatorSchema } from "@/types/auth";
import { z } from "zod";

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
      const raw_data = await api?.get("/api/user");
      console.log(raw_data);
      const data = z
        .object({ result: UserDataWithEducatorSchema })
        .parse(raw_data);
      console.log(data);
      return data.result;
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
