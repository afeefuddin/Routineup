"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAxios(publicRoute = false) {
  const backend_origin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;

  const { data: token } = useQuery({
    queryKey: ["local-storage", "token"],
    queryFn: async () => {
      return localStorage.getItem("token");
    },
  });

  if (!publicRoute && !token) {
    throw new Error("Token not found");
  }
  if (!backend_origin) {
    throw new Error("Backend origin not found");
  }

  const api = new Api(token, backend_origin);

  return api;
}

class Api {
  token: string | null;
  baseURL: string | undefined;
  constructor(token: string | null, baseURL: string | undefined) {
    this.token = token;
    this.baseURL = baseURL;
  }
  async get(url: string) {
    const response = await axios.get(this.baseURL + url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const data = await response.data;
    return data;
  }
  async post(url: string, body: any) {
    const response = await axios.post(this.baseURL + url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const data = await response.data;
    return data;
  }
  async put(url: string, body: any) {
    const response = await axios.put(this.baseURL + url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const data = await response.data;
    return data;
  }
}
