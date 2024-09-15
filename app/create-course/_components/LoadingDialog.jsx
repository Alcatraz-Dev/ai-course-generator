'use client'
import React from "react";
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
import { IMG } from "@/app/public";
import Image from "next/image";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-[#1F1F23] border-[#ffffff9e] my-5">
        <AlertDialogHeader className=" flex justify-center items-center text-center">
          <div className="  flex justify-center items-center my-5 animate-pulse">
            <Image src={IMG.Thinking} width={100} height={100} alt="thinking" />
          </div>
          <AlertDialogDescription className=" flex justify-center items-center text-center py-2 ">
            Please wait ... AI while we generate your course, this not takes
            long.
          </AlertDialogDescription>
          <div className="py-3">
            <span className="text-primary font-bold text-xs uppercase">
              Thank you for your patience
            </span>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
