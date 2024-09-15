import { IMG } from "@/app/public";
import Image from "next/image";
import React from "react";

function Upgrade() {
  return (
    <div className="bg-[#1F1F23] h-full w-full">
      <h2 className="font-bold text-sm uppercase text-secondary my-2">
        {" "}
        Upgrade your plan{" "}
      </h2>
      <p className="text-lg text-gray-400 py-5 flex text-center justify-center mt-[40%] md:mt-[20%] lg:mt-[10%]">
        usage is free for now you can delete corse if you rish the 5 courses and
        you want to generate more courses , have fun , and keep learning
      </p>
      <div className="flex justify-center items-center">
        <Image
          src={IMG.Learning}
          width={300}
          height={300}
          alt="learning image"
        />
      </div>
    </div>
  );
}

export default Upgrade;
