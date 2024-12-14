import { LayoutDashboard, School } from "lucide-react";

import { Routes } from "@/types/routes";

export const routes: Routes = {
  Menu: [
    {
      label: "Dashboard",
      route: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      label: "Gestion des classes",
      route: "/admin/manage/classes",
      icon: <School />,
    },
  ],
};
