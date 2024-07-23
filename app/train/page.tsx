"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Checkbox } from "@nextui-org/react"
import { DatePicker } from "@nextui-org/react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { LayoutGrid } from "@/components/ui/layout-grid"
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";

export default function TrainPage() {
    const placeholder1 = [
        "New Delhi", "Durgapur", "Bankura", "Asansole", "Howrah", "Sealdah", "Mumbai CSMT", "Shalimar", "Ranchi", "Kharagpur",
    ];
    const placeholder2 = [
        "Cochin", "Bombay", "Delhi", "Mumbai", "Kolkata", "Chennai", "Hyderabad", "Bangalore", "Ahmedabad", "Pune", "Gurgaon"
    ];
    const words = [
        {
            text: "Serach",
            className: "text-white"
        },
        {
            text: "your",
            className: "text-white"

        },
        {
            text: "trains",
            className: "text-white"

        },
        {
            text: "with",
            className: "text-white"

        },
        {
            text: "Tourism.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];

    const router = useRouter();
    const [fromStation, setFromStation] = useState<string | null>(null);
    const [toStation, setToStation] = useState<string | null>(null);
    const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));
    const [disabilityCheckBox, setDisabilityCheckBox] = useState<boolean>(false);
    const [berthAvailabilityCheckBox, setBerthAvailabilityCheckBox] = useState<boolean>(false);
    const [dateFlexibleCheckBox, setDateFlexibleCheckBox] = useState<boolean>(false);
    const [concesssionCheckBox, setConcesssionCheckBox] = useState<boolean>(false);
    let formatter = useDateFormatter({ dateStyle: "full" });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Deleted");
    };
    const handleDisabilityCheckBox = () => {
        setDisabilityCheckBox(!disabilityCheckBox);
    }
    const handleBerthAvailabilityCheckBox = () => {
        setBerthAvailabilityCheckBox(!berthAvailabilityCheckBox);
    }
    const handleDateFlexibleCheckBox = () => {
        setDateFlexibleCheckBox(!dateFlexibleCheckBox);
    }
    const handleConcessionCheckBox = () => {
        setConcesssionCheckBox(!concesssionCheckBox);
    }
    const handleSearchTrain = () => {
        router.push(`/trainresult/alltrains/search?from=${fromStation}&to=${toStation}&date=${date}`)
    }


    return (
        <>
            <main className="font-Montserrat bg-[#000435] pb-[1px]">
                <header className="ml-14">
                    <Navbar />
                </header>
                <div className="pt-32 pl-12 flex">
                    <div className="">
                        <div className="flex w-[450px] flex-col justify-center items-center px-4">
                            <p>From</p>
                            <PlaceholdersAndVanishInput
                                placeholders={placeholder1}
                                onChange={(e) => setFromStation(e.target.value)}
                                onSubmit={onSubmit}
                            />
                        </div>
                        <button className="outline-rose-700 ml-52 hover:bg-rose-500 outline rounded-full m-3">
                            <svg className="hover:-rotate-90 p-3 duration-300 rotate-90" xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
                        </button>
                        <div className="flex w-[450px] flex-col justify-center items-center px-4">
                            <p>To</p>
                            <PlaceholdersAndVanishInput
                                placeholders={placeholder2}
                                onChange={(e) => setToStation(e.target.value)}
                                onSubmit={onSubmit}
                            />
                        </div>
                        <div className="flex flex-col ml-5">
                            <div className="flex flex-col">
                                <p className="mt-4">Choose date</p>
                                <div className="flex w-full flex-wrap items-end md:flex-nowrap md:mb-0">
                                    <DatePicker
                                        value={date}
                                        onChange={setDate}
                                        label={"Train date"}
                                        className="max-w-[284px]"
                                        labelPlacement="outside"
                                    />
                                    <p className="text-sm ml-3 text-gray-500">
                                        Selected date: {date ? formatter.format(date.toDate(getLocalTimeZone())) : "--"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 ml-5 space-y-3">
                            <p>
                                <span>
                                    <Checkbox onClick={() => handleDisabilityCheckBox()} isSelected={disabilityCheckBox} className="text-rose-500" defaultSelected color="warning"></Checkbox>
                                </span>
                                <span>Person with disability concession</span>
                            </p>
                            <p>
                                <span>
                                    <Checkbox onClick={() => handleDateFlexibleCheckBox()} isSelected={dateFlexibleCheckBox} className="text-rose-500" defaultSelected color="warning"></Checkbox>
                                </span>
                                <span>Flexible with date</span>
                            </p>
                            <p>
                                <span>
                                    <Checkbox onClick={() => handleBerthAvailabilityCheckBox()} isSelected={berthAvailabilityCheckBox} className="text-rose-500" defaultSelected color="warning"></Checkbox>
                                </span>
                                <span>train with available berth</span>
                            </p>
                            <p>
                                <span>
                                    <Checkbox onClick={() => handleConcessionCheckBox()} isSelected={concesssionCheckBox} className="text-rose-500" defaultSelected color="warning"></Checkbox>
                                </span>
                                <span>railway path concession</span>
                            </p>
                        </div>
                        <button
                            onClick={() => handleSearchTrain()}
                            className="ml-20 mt-10 py-2 px-14 text-black text-base font-bold nded-full overflow-hidden bg-rose-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                        >
                            Search trains
                        </button>
                    </div>
                    <div className="ml-[50px] mt-10">
                        <div className="flex flex-col items-center justify-center h-[5rem]  ">
                            <p className="text-lime-600 dark:text-neutral-200 text-xs sm:text-base  ">
                                The road to freedom starts from here
                            </p>
                            <TypewriterEffectSmooth words={words} />
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            </div>
                        </div>
                        <div className="h-[30rem] py-2">
                            <LayoutGrid cards={cards} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                House in the woods
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A serene and tranquil retreat, this house in the woods offers a peaceful
                escape from the hustle and bustle of city life.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                House above the clouds
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Perched high above the world, this house offers breathtaking views and a
                unique living experience. It&apos;s a place where the sky meets home,
                and tranquility is a way of life.
            </p>
        </div>
    );
};

const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Greens all over
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Rivers are serene
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house by the river is a place of peace and tranquility. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail:
            "https://assets.thehansindia.com/h-upload/2023/06/26/1360811-vande-bharat-express-train.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail:
            "https://www.financialexpress.com/wp-content/uploads/2019/10/Vande-Bharat-12-1.jpg?w=350",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail:
            "https://images.news18.com/ibnlive/uploads/2023/07/untitled-22.jpg",
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "https://st2.indiarailinfo.com/kjfdsuiemjvcya1/0/2/4/9/4893249/0/img356914747840.jpg",
    },
];