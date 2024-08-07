"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  return (
    <>
      <div className="font-Montserrat h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Join the Tourism
          </h1>
          <p></p>
          <p className="text-neutral-500 mx-auto my-2 text-base md: sm:text-sm md:text-lg md:w-[700px] text-center z-10 px-4">
            Welcome! We offer the greatest support for your tour experience, assistance with any kind of event you can organise, simple access to tour trains and flights, and guidance on any trip cancellations, such as inclement weather, cancelled trains or flights, etc. Keep checking back.
          </p>
          <div className="relative group mt-6 sm:ml-10 md:ml-28 flex justify-center">
            <div className="relative w-48 sm:w-56 md:w-64 h-12 sm:h-14 opacity-90 overflow-hidden rounded-xl bg-black z-10">
              <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[15rem] md:group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-36 sm:w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>

              <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black">
                <button
                  onClick={() => router.push("/train")}
                  name="text"
                  className="items-center flex input font-semibold text-md sm:text-lg h-full opacity-90 w-full px-8 sm:px-14 py-3 rounded-xl bg-black"
                >
                  Get Started
                  <svg
                    className="ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M22 12l-4-4v3H3v2h15v3l4-4z" />
                  </svg>
                </button>
              </div>
              <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[30px]"></div>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
