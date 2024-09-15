"use client";
import React, { useContext } from "react";
import { House, LayoutDashboard, ShieldCheck, Power , Palette } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useClerk } from "@clerk/nextjs";

function SideBar() {
  const { signOut } = useClerk();
  const { userCourseList } = useContext(UserCourseListContext);
  const path = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(); // Call Clerk's signOut function
      // Optionally show a confirmation message or redirect to the login page manually
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <House />,
      path: "/dashboard",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    {
      id: 2,
      name: "Explore",
      icon: <LayoutDashboard />,
      path: "/dashboard/explore",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <ShieldCheck />,
      path: "/dashboard/upgrade",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    {
      id: 4,
      name: "Theme",
      icon: <Palette />,
      path: "/dashboard/theme",
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
    {
      id: 5,
      name: "Logout",
      icon: <Power />,
      hover: "hover:text-primary hover:bg-gray-800 hover:rounded-lg",
    },
  ];

  return (
    <>
      <div className="fixed h-full md:w-64 p-5 shadow-md shadow-gray-500 bg-[#1F1F23]">
        <Link href={"/dashboard"}>
          <h1 className="text-primary font-bold uppercase text-sm z-10 hover:cursor-pointer ml-5">
            AI COURSE GENERATOR.
          </h1>
        </Link>

        <div className="mt-16">
          {/* Menu */}
          {Menu.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 text-gray-600 p-3 mb-3 ${
                item.hover
              } ${
                item.path == path && "bg-zinc-900 rounded-lg text-gray-200"
              } cursor-pointer`}
              onClick={item.id === 5 ? handleLogout : undefined} // Only handle logout for the logout item
            >
              {item.id !== 5 ? (
                <Link href={item.path} passHref>
                  <div className="flex items-center gap-5">
                    <div className="text-xl font-bold">{item.icon}</div>
                    <div className="text-lg ">{item.name}</div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="text-xl font-bold">{item.icon}</div>
                  <div className="text-lg ">{item.name}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 w-[80%]">
          <div className="text-sm my-5 font-bold flex justify-center items-center text-secondary">
            <span className="mx-1 ">
              {userCourseList?.length}
              {""}{" "}
            </span>{" "}
            {""} <span>{""}Out of 5 Courses Created</span>
          </div>
          <Progress value={(userCourseList?.length / 5) * 100} />
          <h2 className="text-xs text-center my-3 flex justify-center items-center text-gray-500">
            Upgrade your plan for unlimited course generation
          </h2>
        </div>
      </div>
    </>
  );
}

export default SideBar;
