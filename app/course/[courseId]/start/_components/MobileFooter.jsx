import { Button } from "@/components/ui/button";
import React from "react";
import { PiClockAfternoonBold, PiCheckCircleDuotone } from "react-icons/pi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function MobileFooter({
  course,
  chapters,
  selectedChapterIndex,
  setSelectedChapter,
  getSelectedChapterContent,
}) {
  const currentChapter = chapters[selectedChapterIndex];
  const isLastChapter = selectedChapterIndex >= chapters.length - 1;
  const isFirstChapter = selectedChapterIndex <= 0;

  const handlePrev = () => {
    if (!isFirstChapter) {
      const prevIndex = selectedChapterIndex - 1;
      setSelectedChapter(chapters[prevIndex]);
      getSelectedChapterContent(chapters[prevIndex]?.courseId, prevIndex);
    }
  };

  const handleNext = () => {
    if (!isLastChapter) {
      const nextIndex = selectedChapterIndex + 1;
      setSelectedChapter(chapters[nextIndex]);
      getSelectedChapterContent(chapters[nextIndex]?.courseId, nextIndex);
    }
  };
  return (
    <div className="block md:hidden h-[220px] fixed bottom-0 w-full bg-zinc-800 border-t border-zinc-700 p-2  justify-between items-center rounded-t-lg">
      <div>
        <h2 className="font-bold text-lg bg-primary text-white p-4 text-center">
          {course?.courseOutput?.course?.name}
        </h2>
        {/* <div
          className={`text-sm flex flex-row text-gray-500 text-center pt-2   items-center gap-2 ${
            currentChapter?.isComplete  && "text-lime-500 font-bold"
          } `}
        >
          <h2> Chapter complete</h2>
          <PiCheckCircleDuotone
            className={`text-xl flex-none "text-gray-500  ${
              currentChapter?.isComplete  && "text-lime-500"
            } `}
          />
        </div> */}
         {/* <div
          className={`text-sm flex flex-row text-gray-500 text-center pt-2 items-center gap-2 ${
            currentChapter?.isComplete ? "text-lime-500 font-bold" : ""
          }`}
        >
          <h2>
            {currentChapter?.isComplete ? "Chapter complete" : "Chapter not complete"}
          </h2>
          <PiCheckCircleDuotone
            className={`text-xl flex-none ${
              currentChapter?.isComplete ? "text-lime-500" : "text-gray-500"
            }`}
          />
        </div> */}
      </div>

      <div className="flex-grow text-center text-white my-2">
        <h2 className="font-medium text-gray-300">
          {chapters[selectedChapterIndex]?.name}
        </h2>
        <h2 className=" text-sm font-medium text-primary flex items-center justify-center  text-center gap-2 py-2">
          {" "}
          <span className=" text-sm text-primary ">
            <PiClockAfternoonBold />
          </span>
          {chapters[selectedChapterIndex]?.duration}
        </h2>
      </div>

      <Pagination>
        <PaginationContent
          className={"flex justify-between items-center px-5  gap-5"}
        >
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              disabled={selectedChapterIndex <= 0} // Disable if on the first chapter
              className={` text-white bg-primary ${
                selectedChapterIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
          {/* Display the current page number */}
          <PaginationItem className={"bg-primary rounded-lg text-white"}>
            <PaginationLink>{selectedChapterIndex + 1}</PaginationLink>
          </PaginationItem>

          {/* Optional: Add total pages if needed */}
          <PaginationItem>
            <PaginationEllipsis className={"text-white"} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              disabled={selectedChapterIndex >= chapters.length - 1} // Disable if on the last chapter
              className={`text-white bg-primary ${
                selectedChapterIndex >= chapters.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default MobileFooter;
