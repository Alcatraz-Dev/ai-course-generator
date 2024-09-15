import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" h-screen w-full bg-[#1F1F23]  fixed">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="flex justify-center items-center mt-[200px] z-10">
          <SignUp />
        </div>
      </div>
      <div className=" left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36)]"></div>
    </div>
  );
}
