"use client";

import SidebarWrapper from "@/components/SidebarWrapper";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 p-6 bg-gray-50">
        <Provider store={store}>{children}</Provider>
      </main>
    </div>
  );
}
