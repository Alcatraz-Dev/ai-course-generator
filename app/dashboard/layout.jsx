"use client";
import React, { useEffect, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashboardLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const [userCourseList, setUserCourseList] = useState([]);
  // Ensure component is only rendered on the client-side to avoid SSR/CSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until component is mounted on the client
  }

  return (
    <>
      <UserCourseListContext.Provider
        value={{ userCourseList, setUserCourseList }}
      >
        <div className="bg-[#1F1F23] h-full w-full">
          <div className="md:w-64 hidden md:block">
            <SideBar />
          </div>
          <div className="md:ml-64">
            <Header />
            <div className="p-10">{children}</div>
          </div>
        </div>
      </UserCourseListContext.Provider>
    </>
  );
}

export default DashboardLayout;
