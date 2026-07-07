// ==========================================
// FILE: dynamic-sidebar.tsx
// ==========================================
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { AdminSidebar } from "../admin/admin-sidebar";

export function DynamicSidebar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? <AdminSidebar /> : <Sidebar />;
}
