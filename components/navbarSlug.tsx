"use client"

import React, { useCallback } from "react";
import { useState } from "react";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface NavbarSlugProps {
    SourceCode: string,
    DestinationCode: string,
    selectedDate: string
    adults: number,
    children: number,
    infants: number
    onModifySearchChange: (newValue: boolean) => void;
}

export const NavbarSlug: React.FC<NavbarSlugProps> = ({ SourceCode, DestinationCode, selectedDate, adults, children, infants, onModifySearchChange }) => {
   
    const dateObj = new Date(selectedDate);
    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date format provided:", selectedDate);
        return null;
    }

    const dayAbbreviation = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(dateObj);
    const formattedDate = `${dayAbbreviation}, ${dateObj.getDate()} ${new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObj)}`;
    // const formattedDate=""
    const noofpassasanger = adults + children + infants
    const router = useRouter()
    const [isOpenModifySearch, setIsOpenModifySearch] = useState<boolean>(false)


    const handleModify = useCallback(() => {
        setIsOpenModifySearch(true);
        onModifySearchChange(isOpenModifySearch); 
    }, [setIsOpenModifySearch, isOpenModifySearch, onModifySearchChange]);

    return (
    

        <nav className="fixed top-2 z-50 font-Montserrat">
            <ul className="flex items-center p-3">
                <li className="space-x-4 pr-4">
                    <button className="items-center p-3" onClick={() => router.push('/flight')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" /></svg>
                    </button>
                </li>

                <li className="space-x-4">
                    <img className="rounded-full" height={50} width={50} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930" alt="" />
                </li>

                <ul className="flex mr-20 ml-64">
                    <li className="flex items-center space-x-0 justify-start">
                        <p className="text-lg m-6 group relative w-max">
                            <span className="flex items-center">
                                {SourceCode}
                            </span>
                            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                        </p>

                        <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                        </svg>

                        <p className="text-lg m-6 group relative w-max pl-4">
                            <span className="flex items-center">
                                {DestinationCode}
                            </span>
                            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                        </p>
                    </li>

                    <li className="flex space-x-0 pl-4 ">
                        <svg className="m-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>

                        <p className="text-lg m-6 group relative w-max">
                            <span className="flex items-center">

                                {formattedDate}</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                        </p>
                    </li>
                    <li className="flex space-x-0 pl-4">


                        <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>

                        <p className="text-lg m-6 group relative w-max">
                            <span className="flex items-center">

                                {noofpassasanger}</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                        </p>
                    </li>
                    <li>

                        <button className="flex space-x-0 pr-4 pl-4" onClick={() => handleModify()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="m-6" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

                            <p className="text-lg m-6 group relative w-max">
                                <span className="flex items-center">

                                    Modify Search</span>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </button>
                    </li>
                </ul>
                <ul className="flex space-x-5">
                    <li>
                        <button
                            className="flex items-center gap-2 z-10 cursor-pointer relative px-8 py-2 rounded-md bg-inherit isolation-auto border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>
                            Login
                        </button>

                    </li>
                    <li>
                        <button
                            className="flex gap-2 z-10 cursor-pointer relative px-8 py-2 rounded-md bg-inherit isolation-auto border-2 border-rose-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-rose-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" /></svg>
                            Signup
                        </button>
                    </li>
                </ul>
            </ul>
        </nav>
  
    )
}