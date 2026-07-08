// ==========================================
// FILE: dynamic-sidebar.tsx
// ==========================================
"use client";

<<<<<<< HEAD
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { AdminSidebar } from "../admin/admin-sidebar";
=======
import React from 'react';
import { usePathname } from 'next/navigation';
import { BeneficiarySidebar } from '@/components/dashboard/sidebar';
import { AdminSidebar } from '../admin/admin-sidebar';
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

export function DynamicSidebar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

<<<<<<< HEAD
  return isAdminRoute ? <AdminSidebar /> : <Sidebar />;
=======
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminSidebar />;
  }

  return <BeneficiarySidebar />;
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
}
