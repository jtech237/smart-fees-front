import React from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import {SidebarProvider} from "@/providers/SidebarProvider";

export default function AdminRootLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="h-screen bg-whiten text-body dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex">
            <Sidebar/>
            <div className="relative flex flex-1 flex-col lg:ml-72.5 overflow-y-auto overflow-x-hidden">
              <Header/>
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
