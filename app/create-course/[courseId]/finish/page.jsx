"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
function FinishScreenn({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourse();
  }, [params, user]);
  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params.courseId),
          eq(CourseList.createBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  };
  return (
    <>
      <div className="px-10 md:px-20 lg:px-44 my-7">
        <h2 className="font-bold text-center text-xl text-primary uppercase my-3">
          Congrats ! your course is ready{" "}
        </h2>
        <CourseBasicInfo course={course} refrashData={{}} />
        <h2 className="my-3 font-bold text-secondary">Course URL</h2>
        <h2 className=" flex gap-5 items-center text-center justify-center text-gray-400 border p-3 rounded-xl shadow-sm  my-3">
          {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
          <HiOutlineClipboardDocumentCheck
            className="h-5 w-5 cursor-pointer"
            onClick={async () =>
              await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
              )
            }
          />
        </h2>
      </div>
    </>
  );
}

export default FinishScreenn;
