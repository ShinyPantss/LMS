"use client";

import React from "react";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SideBarItem from "./sidebaritem";
import { usePathname } from "next/navigation";
const guestRoutes = [
  {
    icon: Layout,
    label: "DashBoard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SideBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SideBarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SideBarRoutes;
