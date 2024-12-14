"use client";

import React, {createContext, useContext, useState} from "react";

interface SidebarProviderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarProviderProps | undefined>(undefined)

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{isOpen, toggleSidebar, closeSidebar}}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used whitin a SidebarProvider!")
  }

  return context
}