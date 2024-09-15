"use client";
import { IMG } from "@/app/public";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/fierbaseConfig";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refrashData, edit = true }) {
  const [selectedFile, setSelectedfile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedfile(course?.courseBanner);
    } else {
      setSelectedfile(IMG.Printer);
    }
  }, [course]);
  const onFileselected = async (event) => {
    const file = event.target.files[0];
    setSelectedfile(URL?.createObjectURL(file));
    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded file complete!");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(CourseList.id, course.id));
        });
      });
  };
  return (
    <>
      <div className="p-10 border rounded-xl shadow-sm mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className=" text-secondary font-bold text-xl ">
              {course?.courseOutput?.course?.name}{" "}
              {edit && (
                <span className="ml-2 ">
                  <EditCourseBasicInfo
                    course={course}
                    refrashData={() => refrashData(true)}
                  />
                </span>
              )}
            </h2>
            <p className=" text-gray-400 text-sm mt-10 ">
              {course?.courseOutput?.course?.description}
            </p>
            <h2 className=" text-primary font-bold text-sm  mt-5 flex gap-2 items-center  ">
              {" "}
              <IoExtensionPuzzleOutline />
              {course?.courseOutput?.course?.category}
            </h2>
            {!edit && (
              <Link
                href={`/course/${course?.courseId}/start`}
                className="hidden md:block lg:block"
              >
                <Button className="w-full text-sm font-medium mt-10 hidden md:block lg:block">
                  Start
                </Button>
              </Link>
            )}
          </div>
          <div>
            <div className="border border-[#ffffff9e] rounded-xl h-[300px]">
              <label
                htmlFor="upload-image"
                className="cursor-pointer"
                suppressHydrationWarning
              >
                <>
                  <Image
                    src={selectedFile ? selectedFile : IMG.Printer}
                    width={200}
                    height={200}
                    className="w-full rounded-xl h-[300px] object-cover"
                    alt="course Banner"
                  />
                </>
              </label>
              {edit && (
                <input
                  type="file"
                  id="upload-image"
                  className=" opacity-0"
                  onChange={onFileselected}
                />
              )}
            </div>
            {!edit && (
              <Link
                href={`/course/${course?.courseId}/start`}
                className="block md:hidden lg:hidden"
              >
                <Button className="w-full text-sm font-medium mt-10 block md:hidden lg:hidden">
                  Start
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseBasicInfo;
