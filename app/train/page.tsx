"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from "next/dynamic";
import React from "react";
import animation from "@/lottie/Animation - 1721418182452.json"
import Navbar from "@/components/navbar";

export default function TrainPage() {
    const placeholder1 = [
        "New Delhi", "Durgapur", "Bankura", "Asansole", "Howrah", "Sealdah", "Mumbai CSMT", "Bengalore", "Ranchi", "Kharagpur",
    ];
    const placeholder2 = [
        "Cochin", "Bombay", "Delhi", "Mumbai", "Kolkata", "Chennai", "Hyderabad", "Bangalore", "Ahmedabad", "Pune", "Gurgaon"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <>
            <main className="m-14 font-Montserrat">
                <Navbar />
                <section className="flex">
                    <section className="mt-36 w-full">
                        <div className="flex w-[450px] flex-col justify-center items-center px-4">
                            <PlaceholdersAndVanishInput
                                placeholders={placeholder1}
                                onChange={handleChange}
                                onSubmit={onSubmit}
                            />
                        </div>
                        <button className="outline-rose-700 ml-48 hover:bg-rose-500 outline rounded-full m-3">
                            <svg className="hover:-rotate-90 p-3 duration-300 rotate-90" xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
                        </button>
                        <div className="flex w-[450px] flex-col justify-center items-center px-4">
                            <PlaceholdersAndVanishInput
                                placeholders={placeholder2}
                                onChange={handleChange}
                                onSubmit={onSubmit}
                            />
                        </div>
                    </section>
                    <section className="ml-[930px] fixed mt-32 ">
                        <Lottie animationData={animation} />
                    </section>
                </section>
            </main>
        </>
    )
}