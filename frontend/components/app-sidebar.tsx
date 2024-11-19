"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Book,
  Users,
  Presentation,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useUser from "@/hooks/use-user";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { useRouter } from "next/navigation";

// Menu items.

const EducatorItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Subjects",
    url: "/subjects",
    icon: Book,
  },
  {
    title: "Upcoming classes",
    url: "/classes",
    icon: GraduationCap,
  },
  {
    title: "Schedule classes",
    url: "/classes/add",
    icon: Presentation,
  },
];

const Studentitems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Upcoming classes",
    url: "/upcoming-classes",
    icon: Calendar,
  },
  {
    title: "Your Subjects",
    url: "/your-subjects",
    icon: Search,
  },
  {
    title: "Become an Educator",
    url: "/become-educator",
    icon: Book,
  },
];

export function AppSidebar() {
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      localStorage.clear();
    },
    onSuccess() {
      router.push("/login");
    },
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Routineup</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user?.educator
                ? EducatorItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : Studentitems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => mutate()}>Logout</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
