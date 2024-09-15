import MobileMenu from "@/app/_components/MobileMenu";
import { IMG } from "@/app/public";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <>
      <div className="flex justify-between items-center pt-10 px-8 pb-5 bg-[#1F1F23] ">
        <Link href={"/dashboard"}>
          <h1 className=" flex justify-start items-center text-primary font-bold uppercase text-xl">
            AI COURSE GENERATOR.
          </h1>
        </Link>

        <div className="block md:hidden lg:hidden">
          <MobileMenu />
        </div>
        <div className=" hidden md:block lg:block">
          <UserButton />
        </div>
      </div>
    </>
  );
}

export default Header;
