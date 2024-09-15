"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const { user } = useUser();

  useEffect(() => {
    user && fetchUserCourses();
  }, [user]); // Depend on user to refetch when it changes
  const fetchUserCourses = async () => {
    if (user) {
      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            eq(CourseList.createBy, user.primaryEmailAddress.emailAddress)
          );
        setCourseList(result);
        setUserCourseList(result);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  };

  return (
    <>
      <div className="mt-10 ">
        <h2 className="font-bold text-sm uppercase text-secondary my-2">
          {" "}
          My AI Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.length > 0
            ? courseList.map((course, index) => (
                <CourseCard
                  course={course}
                  key={index}
                  resfreshData={() => fetchUserCourses()}
                />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className="w-full bg-zinc-800 animate-pulse rounded-lg h-[300px] mt-5"></div>
              ))}
        </div>
      </div>
    </>
  );
}

export default UserCourseList;
