import React from "react";

import AdminRootLayout from "@/components/layouts/AdminRootLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
