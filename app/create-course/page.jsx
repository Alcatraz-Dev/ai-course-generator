"use client";
import React, { act, useContext, useEffect, useState } from "react";
import { Blocks, Option, LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_Ai } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CourseList } from "@/configs/schema";
function CreateCourse() {
  const { user } = useUser();
  const router = useRouter();
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <Blocks />,
    },
    {
      id: 2,
      name: "Topic",
      icon: <LandPlot />,
    },
    {
      id: 3,
      name: "Options",
      icon: <Option />,
    },
  ];
  const [loading, setloading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level?.length == 0 ||
        userCourseInput?.level == undefined ||
        userCourseInput?.duration?.length == 0 ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo?.length == 0 ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.numberOfChapters?.length == 0 ||
        userCourseInput?.numberOfChapters == undefined)
    ) {
      return true;
    }
    return false;
  };
  const generateCourseLayout = async () => {
    setloading(true);
    const BASIC_PROMPT =
      "Generate A Course Tutorial on Following Detail With as Course Name, Description, Along with Chapter Name, about, Duration:";
    const USER_INPUT_PROMPT = `Category:'${userCourseInput?.category}', Topic:'${userCourseInput?.topic}',Level:'${userCourseInput?.level}',Duration:'${userCourseInput?.duration}',Number Of Chapters:'${userCourseInput?.numberOfChapters}',in json format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    // console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_Ai.sendMessage(FINAL_PROMPT);
    console.log(JSON.parse(result.response?.text()));
    console.log(result.response?.text());
    setloading(false);
    saveCourseLayoutInDb(JSON.parse(result.response?.text()));
  };
  const saveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4(); // ! COURSE ID //
    setloading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      includeVideo: userCourseInput?.displayVideo,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    console.log("complete");
    router.replace(`/create-course/${id}`);
    setloading(false);
  };
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);
  return (
    <>
    <div className="bg-[#1F1F23]  h-screen w-full" >
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-xl text-primary font-bold uppercase">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-700 p-3 rounded-full text-sm text-white ${
                    activeIndex >= index && "bg-primary "
                  }`}
                >
                  {item.icon}
                </div>

                <h2
                  className={`hideen md:block  text-sm text-gray-500 py-2 ${
                    activeIndex >= index && "text-white font-semibold "
                  }`}
                >
                  {item.name}
                </h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-700 ${
                    activeIndex - 1 >= index && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        {/* Next Button && Previous Button */}

        <div className="flex justify-center items-center space-x-10 w-full mt-20 px-32 font-bold">
          <Button
            className="w-full font-bold text-center text-sm"
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              className="w-full font-bold text-center text-sm"
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              className="w-full font-bold text-center text-sm"
              onClick={() => generateCourseLayout()}
            >
              Generate
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
    </>
  );
}

export default CreateCourse;
