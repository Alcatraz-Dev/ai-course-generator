"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PiTrash } from "react-icons/pi";
import { IMG } from "@/app/public";
import Image from "next/image";
function DropdownOption({ children, handleOnDelete }) {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-[#1F1F23] border-[#ffffff9e] text-secondary hover:text-black ">
          <DropdownMenuItem
            onClick={() => setOpenAlert(true)}
            className="hover:bg-transparent"
          >
            <div className="flex gap-12 items-center ">
              <span>Delete</span>
              <PiTrash />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert}>
        <AlertDialogContent className="bg-[#1F1F23] border-[#ffffff9e] my-5">
          <AlertDialogHeader className=" flex justify-center items-center text-center">
            <div className="  flex justify-center items-center my-5 animate-bounce">
              <Image src={IMG.Trash} width={100} height={100} alt="Trash" />
            </div>
            <AlertDialogDescription className=" flex justify-center items-center text-center py-2 ">
              Are you sure you want to delete this item ?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleOnDelete();
                setOpenAlert(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropdownOption;
