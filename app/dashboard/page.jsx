
import React from "react";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <>
      <div className="bg-[#1F1F23]   h-screen w-full" suppressHydrationWarning>
        <AddCourse />
        {/* Display list of courses */}
        <UserCourseList />
      </div>
    </>
  );
}

export default Dashboard;
