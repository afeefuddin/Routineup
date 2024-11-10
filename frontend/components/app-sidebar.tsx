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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useUser from "@/hooks/use-user";

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
    url: "#",
    icon: GraduationCap,
  },
  {
    title: "Schedule classes",
    url: "#",
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
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
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
    </Sidebar>
  );
}
