"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import Header from "@/app/create-course/[courseId]/_components/Header";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function Course({ params }) {
  const [course, setCourse] = useState();
  useEffect(() => {
    if (params) getCourse();
  }, [params]);
  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
  };
  return (
    <div>
      <Header />
      <div className="px-5 p-5 md:px20 lg:px-44">
        <CourseBasicInfo course={course} edit={false} refrashData={getCourse} />
        <CourseDetail course={course} refrashData={getCourse} />
        <ChapterList course={course} refrashData={getCourse} edit={false} />
      </div>
    </div>
  );
}

export default Course;
