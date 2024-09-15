import { IMG } from "@/app/public";
import Image from "next/image";
import {
  PiBookBookmarkLight,
  PiDotsThreeOutlineVerticalFill,
} from "react-icons/pi";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, index, resfreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList?.id });
    if (resp) {
      resfreshData();
    }
  };

  return (
    <>
      <Link href={`/course/${course?.courseId}`}>
        <div
          className=" shadow-sm rounded-lg border border-[#ffffff9e] p-2  cursor-pointer mt-4"
          suppressHydrationWarning
        >
          <Image
            src={course?.courseBanner ? course?.courseBanner : IMG.Printer}
            width={300}
            height={200}
            className="w-full h-[200px] object-cover rounded-t-lg"
            alt="course Banner"
          />

          <div className="p-2 ">
            <h2 className=" flex justify-between items-center font-extrabold text-md text-gray-200 my-3 ">
              <span className="  line-clamp-1">
                {" "}
                {course?.courseOutput?.course?.name}
              </span>
              {!displayUser && (
                <DropdownOption handleOnDelete={() => handleOnDelete()}>
                  <PiDotsThreeOutlineVerticalFill className="flex-none" />
                </DropdownOption>
              )}
            </h2>
            <p className="text-xs text-gray-400 mb-2">{course?.category}</p>
            <div className="flex items-center justify-between ">
              <h2 className="text-primary text-sm flex gap-2 items-center p-2 max-w-[50%] ">
                <PiBookBookmarkLight />
                {course?.courseOutput?.course?.numberOfChapters} Chapters
              </h2>
              <h2 className="text-primary text-sm p-2    max-w-[50%]">
                {course?.level}
              </h2>
            </div>
            {displayUser && (
              <div className="flex gap-2 items-center mt-2">
                <Image
                  src={course?.userProfileImage}
                  width={40}
                  height={40}
                  className="rounded-xl border-2 border-primary"
                />
                <h2 className="text-gray-400 font-bold text-sm">
                  {course?.userName}
                </h2>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

export default CourseCard;
