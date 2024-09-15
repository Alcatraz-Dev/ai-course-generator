import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };
  return (
    <div className="px-10 md:px20 lg:px-44">
      <div className="grid grid-cols-2 gap-10 ">
        <div>
          <label className="text-secondary my-3 text-sm font-bold">
            <span className="text-xl"> 🎯 </span> Difficulty Level
          </label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="my-3 text-secondary">
              <SelectValue className="text-secondary" placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F23] text-secondary ">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-secondary my-3 text-sm font-bold">
            <span className="text-xl"> ⏱ </span> Course Duration
          </label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="my-3 text-secondary">
              <SelectValue className="text-secondary" placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F23]  text-secondary ">
              <SelectItem value="30 Minutes">30 Minutes</SelectItem>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-secondary my-3 text-sm font-bold">
            <span className="text-xl"> 🎥 </span> Add Video
          </label>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger className="my-3 text-secondary">
              <SelectValue className="text-secondary" placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F23]  text-secondary ">
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-secondary  text-sm font-bold">
            <span className="text-xl"> 📘 </span> Number Of Chapters
          </label>
          <Input
            type="number"
            placeholder="Enter Number"
            defaultValue={userCourseInput?.numberOfChapters}
            onChange={(event) =>
              handleInputChange("numberOfChapters", event.target.value)
            }
            className="text-secondary mt-3"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
