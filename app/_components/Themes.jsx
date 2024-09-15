"use client";

import React from "react";
import { useTheme } from "./ ThemeProvider";
import { Button } from "@/components/ui/button";
import { themes } from "@/lib/themes";

function Themes() {
  const { theme, setTheme, mode, setMode } = useTheme();

  if (!theme || !mode) {
    return <div>Error: Theme context is not available</div>;
  }

  return (
    <div>
      <div className="flex justify-center  text-white items-center gap-2 text-xl font-bold">
        {" "}
        Active Theme is {theme}
        <div className="rounded-xl p-5 bg-primary "></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 items-center">
        <Button
          className="bg-orange-500"
          onClick={() => setTheme("Orange")}
        ></Button>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => setTheme("Red")}
        ></Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => setTheme("Yellow")}
        ></Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => setTheme("Green")}
        ></Button>
        <Button
          className="bg-rose-500 hover:bg-rose-500"
          onClick={() => setTheme("Rose")}
        ></Button>{" "}
        <Button
          className="bg-blue-500 hover:bg-blue-500"
          onClick={() => setTheme("Blue")}
        ></Button>
        <Button
          className="bg-violet-500 hover:bg-violet-500"
          onClick={() => setTheme("Violet")}
        ></Button>
         <Button
          className="bg-cyan-500 hover:bg-cyan-500"
          onClick={() => setTheme("Turquoise")}
        ></Button>
      </div>
    </div>
  );
}

export default Themes;
