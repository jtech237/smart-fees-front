import React from "react";
import {RouteItem} from "@/types/routes";
import SidebarItem from "@/components/sidebar/SidebarItem";

interface Props {
  name: string;
  items: RouteItem[];
  pageName: string;
  setPageName: (value: string) => void
}

const SidebarMenuGroup: React.FC<Props> = (
  {name, items, pageName, setPageName}
) => (

  <div>
    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
      {name}
    </h3>

    <ul className="mb-6 flex flex-col gap-1.5">
      {items.map((menuItem, menuIndex) => (
        <SidebarItem
          key={menuIndex}
          item={menuItem}
          pageName={pageName}
          setPageName={setPageName}
        />
      ))}
    </ul>
  </div>
)

export default SidebarMenuGroup
