"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, DatePicker } from "@nextui-org/react"
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import React, { useCallback } from "react";
import { useState } from "react";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import {Counter} from "@/components/ui/counter";


interface NavbarSlugProps {
    SourceCode: string,
    DestinationCode: string,
    selectedDate: string
}

export const NavbarSlug: React.FC<NavbarSlugProps> = ({ SourceCode, DestinationCode, selectedDate,  }) => {
    const [isTraveller, setIsTraveller] = useState(false);

    const router = useRouter()

    const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));
    const [defaultValue, setDefaultValue] = useState('');
    const dateObj = new Date(selectedDate);

    const handleTraveller = useCallback(() => {
        setIsTraveller(isTraveller => !isTraveller);
    }, []);

    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date format provided:", selectedDate);
        return null;
    }
    const formatDate = (date: DateValue): string => {
        const dateObj = date.toDate(getLocalTimeZone());
        return dateObj.toLocaleDateString("en-CA");
    };


    return (
        <nav className="bg-inherit pt-28 ml-20 mb-5">
            <ul className="flex gap-3">
                <li>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="text"
                            label="Form"
                            labelPlacement="outside"
                        />
                    </div>
                </li>
                <li className="mt-3">
                    <button className="outline-rose-700 hover:bg-rose-500 outline rounded-full m-3">
                        <svg className="hover:-rotate-90 p-2 duration-700 ease-in-out rotate-90" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
                    </button>
                </li>
                <li>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="text"
                            label="To"
                            labelPlacement="outside"
                        />
                    </div>
                </li>
                <li className="ml-10">
                    <div className="flex flex-col mt-6 ml-1">
                        <div className="flex flex-col">
                            <div className="flex mb-4 w-full flex-wrap items-end md:flex-nowrap md:mb-0">
                                <DatePicker
                                    value={date}
                                    onChange={setDate}
                                    className="max-w-[284px]"
                                    labelPlacement="outside"
                                />
                            </div>
                        </div>
                    </div>
                </li>
                <li className="ml-10">
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger className="w-[260px] h-6 mt-6">
                            <Input
                                type="text"
                                label="Traveller"
                                value={defaultValue}
                                className="text-md"
                                onClick={handleTraveller}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground" {...titleProps}>
                                        Add passengers
                                    </p>
                                    <div className=" text-gray-500 mt-5 space-y-3">
                                        <div className="flex space-x-7">
                                            <p>Adult</p>
                                            <Counter value="adult"/>
                                        </div>
                                        <div className="flex space-x-7">
                                            <p>Child</p>
                                            <Counter  value="children"/>
                                        </div>
                                        <div className="flex space-x-6">
                                            <p>Infant</p>
                                            <Counter value="infants"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </li>
                <li>
                    <button
                        className="mt-6 ml-24 py-2 px-14 text-black text-base font-bold nded-full overflow-hidden bg-rose-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                    >
                        Modify search
                    </button>
                </li>
            </ul>
        </nav>
    )
}
// <nav className="mt-20 font-Montserrat">
//     <ul className="flex mr-20 ml-64 space-x-5">
//         <li className="flex items-center justify-start">
//             <span className="">{SourceCode}</span>
//             <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
//                 <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
//             </svg>
//             <span className="text-lg m-6 group relative w-max pl-4">{DestinationCode}</span>
//         </li>
//         <li className="flex space-x-0 pl-4 ">
//             <svg className="m-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
//             <span className="flex items-center">{formattedDate}</span>
//         </li>
//         <li className="flex space-x-0">
//             <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>
//             <span className="flex items-center">{noofpassasanger}</span>
//         </li>
//         <li>
//             <button className="flex space-x-0" onClick={() => handleModify()}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

//                 <p className="text-lg m-6 group relative w-max">
//                     <span className="flex items-center">

//                         Modify Search</span>
//                     <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
//                     <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
//                 </p>
//             </button>
//         </li>
//     </ul>
// </nav>