import React, { useContext } from "react";
import CategoryList from "../_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category }));
  };
  return (
    <>
    <div className="px-10 md:px-20">
      <h2 className="text-gray-500 my-5 flex justify-center items-center font-semibold">
        Select Course Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10  cursor-pointer ">
        {CategoryList.map((item, index) => (
          <div
            className={`flex flex-col  p-5 border border-secondary hover:border-primary hover:border-2 hover:bg-gray-500/20 items-center rounded-2xl
              ${
                userCourseInput?.category == item.name &&
                "bg-gray-500/20  border-2 border-primary "
              }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} height={50} width={50} alt="category" />
            <h2
              className={`text-secondary font-bold my-3 hover:text-primary  text-sm  ${
                userCourseInput?.category == item.name && " text-primary "
              }`}
            >
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default SelectCategory;
