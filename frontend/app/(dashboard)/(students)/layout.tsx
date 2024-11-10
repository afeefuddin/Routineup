"use client";
import useUser from "@/hooks/use-user";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  if (user.educator) {
    redirect("/home");
  }
  return <>{children}</>;
}
