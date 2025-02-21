"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Table,
  ChevronLeft,
  ChevronRight,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { href: "/", icon: LayoutGrid, label: "Card View" },
    { href: "/table", icon: Table, label: "Table View" },
  ];

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 shadow transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1740042485/Screenshot_2025-02-19_202118-removebg-preview_ri5eaq.png"
            alt="EMS Logo"
            width={150}
            height={100}
            className="rounded-full"
          />
          {/* {!collapsed && (
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              EMS
            </h2>
          )} */}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav className="mt-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center py-2 px-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white",
              pathname === item.href &&
                "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
            )}
          >
            <item.icon className="h-6 w-6" />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
