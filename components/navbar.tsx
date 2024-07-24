"use client"

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {

    const router = useRouter();
    const { user } = useKindeBrowserClient();
    const [name, setName] = useState<string>('');
    const [isloggedin, setisLoggedin] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef(null);

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    useEffect(() => {
        if (user) {
            setName(`${user.given_name} ${user.family_name}`)
            setisLoggedin(true)
        } else {
            setisLoggedin(false)
        }
    }, [setisLoggedin, user])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-ignore
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, closeDropdown]);

    return (
        <>
            <nav className="fixed pl-10 top-2 z-50 font-Montserrat">
                <ul className="flex items-center p-3">
                    <li className="flex items-center justify-center'">
                        <img className="rounded-full" height={50} width={50} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930" alt="" />
                        <p className="font-bold ml-5 text-xl">TOURISM</p>
                    </li>
                    <ul className="flex mr-20 ml-64">
                        <li onClick={() => router.push("/")} className="text-rose-500 cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <span className="flex items-center">
                                    <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    Home
                                </span>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600"></span>
                            </p>
                        </li>
                        <li onClick={() => router.push("/train")} className="cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <span className="flex items-center">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm280 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z" /></svg>
                                    Train</span>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </li>
                        <li onClick={() => router.push("/flight")} className="cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <span className="flex items-center">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z" /></svg>
                                    Flight</span>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </li>
                        <li onClick={() => router.push("/about")} className="mr-32 cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <span className="flex items-center">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                    About</span>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </li>
                    </ul>
                    {isloggedin ? (
                        <p onClick={() => toggleDropdown()} className="flex space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
                            <span>{name}</span>
                            <svg className={`${showDropdown ? "rotate-90" : ""} duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360 280-560h400L480-360Z" /></svg>
                        </p>
                    ) : (

                        <ul className="flex space-x-5">
                            <li>
                                <LoginLink postLoginRedirectURL="/">
                                    <button
                                        className="flex items-center gap-2 z-10 cursor-pointer relative px-8 py-2 rounded-md bg-inherit isolation-auto border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>
                                        Login
                                    </button>
                                </LoginLink >

                            </li >
                            <li>
                                <RegisterLink postLoginRedirectURL="/">
                                    <button
                                        className="flex gap-2 z-10 cursor-pointer relative px-8 py-2 rounded-md bg-inherit isolation-auto border-2 border-rose-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-rose-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" /></svg>
                                        Signup
                                    </button>
                                </RegisterLink>
                            </li>
                        </ul >
                    )
                    }
                </ul>
                {showDropdown &&
                    <div ref={dropdownRef} className="w-[200px] duration-300 ease-in-out translate-y-2 fixed right-[100px] top-24 bg-gray-700  rounded-lg">
                        <ul className="">
                            <LogoutLink>
                                <li className="flex space-x-2 hover:bg-rose-600 rounded-lg p-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                    <span>
                                        Logout
                                    </span>
                                </li>
                            </LogoutLink>
                        </ul>
                    </div>
                }
            </nav >
        </>
    )
}