"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import YouTube from "react-youtube";
import { PiCheckCircleDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
// Responsive YouTube video options
const opts = {
  playerVars: {
    autoplay: 0, // Disable autoplay
  },
};

function ChapterContent({ chapter, content, course }) {
  const [isCompleted, setIsCompleted] = useState(course?.isCompleted || false);

  useEffect(() => {
    if (course) {
      setIsCompleted(course?.isCompleted || false);
    }
  }, [course]);

  // Video end handler
  const onVideoEnd = async () => {
    setIsCompleted(true);

    try {
      await db
        .update(CourseList)
        .set({ isCompleted: true }) // Update the chapter status in the ChaptersList table
        .where(eq(CourseList?.courseId, course?.courseId)); // Update based on the chapterId

      console.log("Chapter marked as complete.");
      // Optionally trigger a refresh in the parent component
    } catch (error) {
      console.error("Error updating chapter status:", error);
    }
  };

  return (
    <div>
      {chapter && content && (
        <div className="p-6 md:px-10 lg:px-16 mb-20">
          {/* Title section */}
          <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-white">
            {chapter?.name}
          </h2>
          <p className="text-gray-400 my-4">{chapter?.about}</p>
          {/* Chapter completion indicator */}
          {
            <div
              className={` text-sm flex flex-row text-gray-400 text-center pt-2   items-center gap-2 ${
                isCompleted ? "text-lime-500 font-bold" : ""
              }`}
            >
              <PiCheckCircleDuotone
                className={`text-xl flex-none "text-gray-500  ${
                  isCompleted && "text-lime-500"
                } `}
              />
              {isCompleted
                ? "Chapter complete ! Well done."
                : "Chapter not completed yet."}
            </div>
          }
          {/* Video section */}
          <div className="flex justify-center my-6">
            {chapter && content?.videoId && (
              <div className="w-full h-0 relative pb-[56.25%] items-center justify-center">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <YouTube
                  videoId={content?.videoId}
                  opts={opts}
                  className="absolute top-0 left-0 w-full h-full"
                  iframeClassName="w-full h-full rounded-xl"
                  onEnd={() => onVideoEnd(chapter?.chapterId)}
                />
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="mb-32 md:mb-20 lg:mb-20">
            {content?.content?.map((item, index) => (
              <div key={index} className="p-4 bg-zinc-800 mb-6 rounded-lg ">
                <h2 className="font-medium text-lg text-white">
                  {item?.title}
                </h2>
                <ReactMarkdown className="text-sm text-gray-300 whitespace-pre-wrap">
                  {item?.explanation}
                </ReactMarkdown>

                {item?.code_example && (
                  <div className="p-4 bg-neutral-900 text-white rounded-lg my-3 overflow-auto">
                    <pre>
                      <code>{item?.code_example}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
            <Button className={"w-full gap-3 "} onClick={onVideoEnd}>
              {" "}
              <PiCheckCircleDuotone /> Marke as complete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterContent;
