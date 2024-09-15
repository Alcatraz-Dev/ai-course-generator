"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  House,
  LayoutDashboard,
  ShieldCheck,
  Power,
  Palette,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
function MobileMenu() {
  const { signOut } = useClerk();
  const path = usePathname();
  const { user } = useUser();
  const handleLogout = async () => {
    try {
      await signOut(); // Call Clerk's signOut function
      // Optionally show a confirmation message or redirect to the login page manually
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const Menu = {
    Home: {
      id: 1,
      name: "Home",
      icon: <House />,
      path: "/dashboard",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    Explore: {
      id: 2,
      name: "Explore",
      icon: <LayoutDashboard />,
      path: "/dashboard/explore",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    Upgrade: {
      id: 3,
      name: "Upgrade",
      icon: <ShieldCheck />,
      path: "/dashboard/upgrade",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    Theme: {
      id: 4,
      name: "Theme",
      icon: <Palette />,
      path: "/dashboard/theme",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    Logout: {
      id: 5,
      name: "Logout",
      icon: <Power />,
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
  };
  return (
    <div className={"bg-[#1F1F23] text-white border-none hover:text-primary"}>
      <Menubar className={"bg-[#1F1F23] active:bg-[#1F1F23] hover:text-primary"}>
        <MenubarMenu className={"bg-[#1F1F23] text-white  border-none hover:text-primary"}>
          <div
            className={
              "bg-[#1F1F23] text-white border-none active:bg-[#1F1F23] hover:text-primary"
            }
          >
            <MenubarTrigger
              className={
                "bg-[#1F1F23] text-white border-none active:bg-[#1F1F23]  hover:cursor-pointer hover:text-primary "
              }
            >
              <HiOutlineMenuAlt2 />
            </MenubarTrigger>
          </div>
          <MenubarContent className={"bg-[#1F1F23] text-white hover:text-primary"}>
            <Link key={Menu?.Home?.id} href={Menu?.Home?.path}>
              <MenubarItem
                className={"gap-5  hover:cursor-pointer hover:text-primary"}
              >
                {Menu?.Home?.icon}
                {Menu?.Home?.name}
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link key={Menu?.Explore?.id} href={Menu?.Explore?.path}>
              <MenubarItem
                className={"gap-5  hover:cursor-pointer hover:text-primary"}
              >
                {Menu?.Explore?.icon}
                {Menu?.Explore?.name}
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link key={Menu?.Upgrade?.id} href={Menu?.Upgrade?.path}>
              <MenubarItem
                className={"gap-5  hover:cursor-pointer hover:text-primary"}
              >
                {Menu?.Upgrade?.icon}
                {Menu?.Upgrade?.name}
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link key={Menu?.Theme?.id} href={Menu?.Theme?.path}>
              <MenubarItem
                className={"gap-5  hover:cursor-pointer hover:text-primary "}
              >
                {Menu?.Theme?.icon}
                {Menu?.Theme?.name}
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <MenubarItem
              className={"gap-5  hover:cursor-pointer hover:text-primary"}
              onClick={handleLogout}
            >
              {Menu?.Logout?.icon}
              {Menu?.Logout?.name}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className={"flex justify-end items-end gap-7 "}>
              <span className="font-bold ">{user?.fullName}</span>{" "}
              <UserButton />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default MobileMenu;
