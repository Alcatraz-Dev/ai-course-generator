import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { TbEdit } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
function EditCourseBasicInfo({ course, refrashData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    setName(course?.courseOutput?.course?.name);
    setDescription(course?.courseOutput?.course?.description);
  }, [course]);
  const onUpdateHandler = async () => {
    course.courseOutput.course.name = name;
    course.courseOutput.course.description = description;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });
    refrashData(true);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TbEdit className="mt-5 text-center flex items-center text-primary" />
        </DialogTrigger>
        <DialogContent className="bg-[#1F1F23]  border-[#ffffff9e] my-5 text-secondary">
          <DialogHeader>
            <DialogTitle className="text-secondary font-bold text-xl">
              Edit Course Title & Description
            </DialogTitle>
            <DialogDescription>
              <div className="my-3">
                <label className="text-gray-400 "> Course Title</label>
                <Input
                  className="border-[#ffffff9e] text-secondary mt-2"
                  placeholder="Enter your course Title..."
                  defaultValue={course?.courseOutput?.course?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label className="text-gray-400 "> Course Description</label>
                <Textarea
                  className="border-[#ffffff9e] text-secondary mt-2 h-40"
                  placeholder="Enter your course description..."
                  defaultValue={course?.courseOutput?.course?.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditCourseBasicInfo;
