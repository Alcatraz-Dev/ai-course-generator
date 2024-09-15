"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  return (
    <>
      <div className=" lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center   ">
        <div>
          <h2 className="text-xl text-white font-semibold">
            Hello,{""}
            <span className="text-primary font-bold">
              {" "}
              {""}
              {user?.fullName}
            </span>
          </h2>
          <p className="text-sm text-gray-400 py-5">
            Create new course with AI, Share with friends and Earn from it.{" "}
          </p>
        </div>
        <div className="flex justify-center items-center  ">
          <Link
            href={userCourseList >= 5 ? "/dashboard/upgrade" : "/create-course"}
          >
            <Button className="w-full font-semibold text-xs">
              + Create AI Course
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
