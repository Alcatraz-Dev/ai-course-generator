"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    getAllCourses();
  }, [pageIndex]);

  const getAllCourses = async () => {
    try {
      const res = await db
        .select()
        .from(CourseList)
        .limit(9)
        .offset(pageIndex * 9);

      setCourseList(res);
      setIsLastPage(res.length < 9); // Check if fewer than 9 results are returned
    } catch (error) {
      console.log(error);
    }
  };

  // Prevent page change if disabled
  const handlePrev = () => {
    if (pageIndex === 0) return; // Prevent moving to a negative page
    setPageIndex(pageIndex - 1);
  };

  const handleNext = () => {
    if (isLastPage) return; // Prevent moving beyond the last page
    setPageIndex(pageIndex + 1);
  };
  return (
    <div className="bg-[#1F1F23] h-full w-full">
      <h2 className="font-bold text-sm uppercase text-secondary my-2">
        {" "}
        Explore More Projects{" "}
      </h2>
      <p className="text-sm text-gray-400 py-5">
        Explore more projects build with AI by others users
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList.map((course, index) => (
              <div key={index}>
                <CourseCard course={course} displayUser={true} />
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="w-full bg-zinc-800 animate-pulse rounded-lg h-[350px] mt-5"
              ></div>
            ))}
      </div>
      <Pagination>
        <PaginationContent
          className={
            "fixed bottom-0   py-4 flex justify-between items-center px-5 gap-5"
          }
        >
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              disabled={pageIndex === 0} // Disable if on the first page
              className={`text-white bg-primary ${
                pageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>

          {/* Display the current page number */}
          <PaginationItem className={"bg-primary rounded-lg text-white"}>
            <PaginationLink>{pageIndex + 1}</PaginationLink>
          </PaginationItem>

          {/* Optional: Add total pages if needed */}
          <PaginationItem>
            <PaginationEllipsis className={"text-white"} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              disabled={isLastPage} // Disable if it's the last page
              className={`text-white bg-primary ${
                isLastPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Explore;
