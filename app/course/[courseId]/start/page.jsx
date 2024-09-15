"use client";
import { db } from "@/configs/db";
import { ChaptersList, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "./_components/Header";
import MobileFooter from "./_components/MobileFooter";

function CourseStart({ params  }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  useEffect(() => {
    if (params) {
      getCourse();
    }
  }, [params]);

  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId));

      if (result && result.length > 0) {
        setCourse(result[0]);
        // Automatically fetch the first chapter after fetching the course
        const firstChapterIndex = 0;
        setSelectedChapter(
          result[0]?.courseOutput?.course?.chapters[firstChapterIndex]
        );
        await getSelectedChapterContent(result[0]?.courseId, firstChapterIndex);
      } else {
        console.error("Course not found.");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const getSelectedChapterContent = async (courseId, chapterId) => {
    if (!courseId) {
      console.error("Course ID is not defined");
      return;
    }

    try {
      const result = await db
        .select()
        .from(ChaptersList)
        .where(
          and(
            eq(ChaptersList?.chapterId, chapterId),
            eq(ChaptersList.courseId, courseId) // pass courseId explicitly
          )
        );

      if (result && result.length > 0) {
        setChapterContent(result[0]);
        setSelectedChapterIndex(chapterId); // Update selected chapter index
      } else {
        console.error("Chapter not found.");
      }
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };
  return (
    <div>
      <Header />
      <div className=" fixed md:w-72 hidden md:block h-screen border-r border-zinc-700 shadow-sm ">
        <h2 className="font-bold text-lg bg-primary text-white p-4">
          {course?.courseOutput?.course?.name}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-primary/5 ${
                selectedChapter?.name == chapter?.name && "bg-primary/10"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                getSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} course={course} />
      </div>
      {/* Mobile footer */}
      <div className="flex justify-center items-center ">
      <MobileFooter
        course={course}
        chapters={course?.courseOutput?.course?.chapters || []}
        selectedChapterIndex={selectedChapterIndex}
        setSelectedChapter={(chapter) => {
          const index = course?.courseOutput?.course?.chapters.findIndex(
            (chap) => chap?.name === chapter?.name
          );
          setSelectedChapter(chapter);
          if (index !== -1) getSelectedChapterContent(course?.courseId, index);
        }}
        getSelectedChapterContent={getSelectedChapterContent}
      />
      </div>
     
    </div>
  );
}

export default CourseStart;
