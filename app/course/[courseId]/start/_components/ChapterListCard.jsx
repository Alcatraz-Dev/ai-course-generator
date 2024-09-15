import React from "react";
import { PiClockAfternoonBold } from "react-icons/pi";
function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-4 items-center border-b border-zinc-700 shadow-sm">
      <div>
        <h2 className="p-1 bg-primary w-8 h-8 text-white rounded-lg text-center">
          {index + 1}
        </h2>
      </div>
      <div className=" col-span-4">
        <h2 className="font-medium text-gray-300">{chapter?.name}</h2>
        <h2 className=" text-sm font-medium text-primary flex items-center  text-center gap-1">
          <span className=" text-sm text-primary "><PiClockAfternoonBold /></span>
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
