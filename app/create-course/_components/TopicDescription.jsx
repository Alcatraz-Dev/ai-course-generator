import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      {/* Topic  Input*/}
      <div className="mt-5">
        <label className="text-secondary my-3 text-sm">
          <span className="text-xl">✍🏻</span> Write the topic for which you want
          to generate a course (e.g., "Machine Learning Basics" ,"Paython
          Course" , "Yoga", ect.):
          <Input
            className="my-3"
            placeholder="Topic"
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />
        </label>
        <div className="mt-5">
          <label className="text-secondary my-3 text-sm">
            {" "}
            <span className="text-xl">💡</span>Tell us more about your course,
            what you want to include in the corse (Optional)
          </label>
          <Textarea
            className=" text-secondary my-3"
            placeholder="About your course "
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
      {/* Text Area Description */}
    </div>
  );
}

export default TopicDescription;
