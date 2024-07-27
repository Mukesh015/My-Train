"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, DatePicker } from "@nextui-org/react"
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import React, { useCallback } from "react";
import { useState } from "react";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Counter from "./ui/counter";


export const NavbarSlug = () => {
    const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));

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
                        <svg className="hover:rotate-180 p-2 duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
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
                                className="text-md"
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
                                            <Counter />
                                        </div>
                                        <div className="flex space-x-7">
                                            <p>Child</p>
                                            <Counter />
                                        </div>
                                        <div className="flex space-x-6">
                                            <p>Infant</p>
                                            <Counter />
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