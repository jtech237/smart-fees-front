"use client"

import React from "react";
import {useLocalStorage} from "usehooks-ts";
import Clickoutside from "@/components/clickoutside";
import {cn} from "@/lib/utils";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import {routes} from "@/components/sidebar/routes";
import SidebarMenuGroup from "@/components/sidebar/SidebarMenuGroup";
import {useSidebar} from "@/providers/SidebarProvider";

const Sidebar: React.FC = () => {
  const {isOpen, closeSidebar} = useSidebar()
  const [pageName, setPageName] = useLocalStorage("selected-menu", "dashboard")
  return (
    <Clickoutside onClick={closeSidebar}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <SidebarHeader/>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {Object.keys(routes).map((groupName, index) => (
              <SidebarMenuGroup
                name={groupName}
                items={routes[groupName]}
                pageName={pageName}
                setPageName={setPageName}
                key={index}
              />
            ))}
          </nav>
        </div>
      </aside>
    </Clickoutside>
  )
}

export default Sidebar
