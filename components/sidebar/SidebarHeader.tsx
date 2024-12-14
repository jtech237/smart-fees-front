import Link from "next/link";
import Image from "next/image"
import React from "react";
import {Turn as Hamburger} from 'hamburger-react'
import {useSidebar} from "@/providers/SidebarProvider";


const SidebarHeader: React.FC = () => {
  const {closeSidebar, isOpen} = useSidebar()

  return (
    <div className="text-white flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      <Link href="/admin">
        <Image
          width={176}
          height={32}
          src={"/vector/default-monochrome-white.svg"}
          alt="Logo"
          priority
        />
      </Link>

      <button
        onClick={closeSidebar}
        aria-controls="sidebar"
        className="block lg:hidden"
      >
        <Hamburger toggled={isOpen}/>
      </button>
    </div>
  )
}

export default SidebarHeader
