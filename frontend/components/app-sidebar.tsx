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

// Menu items.

const EducatorItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Create a group",
    url: "#",
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
    url: "#",
    icon: Book,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Routineup</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {EducatorItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
