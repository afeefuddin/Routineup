"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError, isPending } = useUser();
  console.log(user, isLoading, isError, isPending);
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }
  }, [user, isLoading, isError]);

  // console.log(isLoading, isError, isPending)
  if (isLoading || isError || isPending) {
    return <div>Loading...</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
