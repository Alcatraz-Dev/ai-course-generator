import React from "react";
import { PiClockAfternoonBold, PiCheckCircleDuotone } from "react-icons/pi";
import EditChaptres from "./EditChaptres";
function ChapterList({ course, refrashData, edit = true }) {
  return (
    <div className="mt-3">
      <h2 className="text-secondary font-bold text-xl">Chaptres</h2>
      <div className="mt-2">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div className="border p-5 rounded-xl mb-2 flex items-center justify-between">
            <div className="flex gap-5 items-center ">
              <h2 className="text-white flex-none bg-primary h-10 w-10  rounded-xl text-center p-2">
                {index + 1}
              </h2>
              <div className="">
                <h2 className="text-secondary font-medium text-lg">
                  {chapter?.name}{" "}
                  {edit && (
                    <EditChaptres
                      course={course}
                      index={index}
                      refrashData={() => refrashData(true)}
                    />
                  )}
                </h2>
                <p className="text-gray-500 text-sm my-1">{chapter?.about}</p>
                <p className="text-primary flex gap-2 items-center my-2">
                  <PiClockAfternoonBold />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <PiCheckCircleDuotone
              className={`text-4xl flex-none ${
                course?.isCompleted ? "text-primary" : "text-gray-500 "
              } `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
