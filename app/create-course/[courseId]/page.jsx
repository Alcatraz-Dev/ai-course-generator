"use client";
import { db } from "@/configs/db";
import { CourseList, ChaptersList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_Ai } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params && getCourse();
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
  const generateChapterContent = async () => {
    setLoading(true);
    const CHAPTRES = course?.courseOutput?.course?.chapters; // Ensure correct spelling of `course`

    if (Array.isArray(CHAPTRES)) {
      for (const [index, chapter] of CHAPTRES.entries()) {
        const PROMPT = `Explain the concept in Detail on Topic: ${course?.name}, Chapter: ${chapter?.name}, in JSON Format with a list of arrays with fields as title, explanation on the given chapter in detail, and Code Example (Code field in <precode> format if applicable)`;

        try {
          // Await the video fetching
          let videoId = "";
          const res = await service.getVideos(
            course?.name + ":" + chapter?.name
          );
          if (res.length > 0) {
            videoId = res[0]?.id?.videoId;
          }

          // Await the AI-generated content
          const result = await GenerateChapterContent_Ai.sendMessage(PROMPT);
          const contentText = await result?.response?.text(); // Await the text response
          const content = JSON.parse(contentText);

          // Insert into the database
          await db.insert(ChaptersList).values({
            chapterId: index,
            courseId: course?.courseId,
            videoId: videoId,
            content: content,
            type: "video",
          });

          console.log("Chapter content inserted:", content);
        } catch (error) {
          setLoading(false);
          console.error("Error generating content:", error);
        }
      }

      setLoading(false);
      await db.update(CourseList).set({
        publish: true,
      });
      router.replace(`/create-course/${course?.courseId}/finish`);
    } else {
      setLoading(false);
      console.error("CHAPTRES is not an array");
    }
  };
  return (
    <>
      <div className="bg-[#1F1F23]  w-full h-screen  mt-2 px-7 md:px-20 lg:px-44 ">
        <h2 className="font-bold text-center text-xl text-primary uppercase">
          Course Layout{" "}
        </h2>
        <LoadingDialog loading={loading} />
        {/* Basic info */}
        <CourseBasicInfo course={course} refrashData={() => getCourse()} />
        {/* Courrse details */}
        <CourseDetail course={course} />
        {/* List of Lesson */}
        <ChapterList course={course} refrashData={() => getCourse()} />
        <Button onClick={generateChapterContent} className="my-10 ">
          {" "}
          Generate Course Content
        </Button>
      </div>
    </>
  );
}

export default CourseLayout;
