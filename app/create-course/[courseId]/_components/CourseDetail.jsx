import React, { useContext } from "react";
import {
  PiChartBar,
  PiClockAfternoonBold,
  PiBookBookmarkLight,
  PiPlayCircle,
} from "react-icons/pi";
function CourseDetail({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
        <div className="flex  gap-2  ">
          <PiChartBar className="text-xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-400 ">Skill Level</h2>
            <h2 className="font-medium text-sm text-secondary">
              {course?.level}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 ">
          <PiClockAfternoonBold className="text-xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-400 ">Duration</h2>
            <h2 className="font-medium text-sm text-secondary">
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 ">
          <PiBookBookmarkLight className="text-xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-400 ">Chapters</h2>
            <h2 className="font-medium text-sm text-secondary text-center">
              {course?.courseOutput?.course?.numberOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 ">
          <PiPlayCircle className="text-xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-400 ">Video Included ?</h2>
            <h2 className="font-medium text-sm text-secondary text-center">
              {course?.includeVideo}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
