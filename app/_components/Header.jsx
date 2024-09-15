import React from "react";
import Link from "next/link";
function Header() {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        <div className=" backdrop-blur-sm bg-[#1F1F23]/30 flex justify-between p-4">
          <Link href={"/"}>
            <h1 className="  text-primary font-bold uppercase text-xl z-10 hover:cursor-pointer ml-5">
              AI COURSE GENERATOR.
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
