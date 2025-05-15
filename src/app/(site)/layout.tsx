"use client";

import { Providers } from "@/components/Provider";
import SidebarWrapper from "@/components/SidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 p-6 md:py-16 lg:py-20 bg-gray-50">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
