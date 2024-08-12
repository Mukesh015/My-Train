"use client"
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import logo from "@/public/logo.jpeg"
import Image from 'next/image'
const LoginForm = lazy(() => import("./loginform"))
import MobileMenu from "./ui/mobilemenu";

export default function Navbar() {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isloggedin, setisLoggedin] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const closeDropdown = useCallback(() => {
        setShowDropdown(false);
    }, []);

    const closeSidebar = useCallback(() => {
        setShowMobileMenu(false);
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const handleLogout = async () => {
        try {
            const res = await signOut();
            console.log(res);
        } catch (error) {
            console.log("firebase error", error);
        }
    };

    const handleSendUserInfo = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    id: userId
                })
            })
            const data = await response.json();
            console.log(data);
            if (data.status) {
                console.log("New user added successfully");
            } else {
                console.error("User already exist");
            }
        } catch (error) {
            console.error("Failed to fetch server");
        }
    }, [name, email, userId])

    useEffect(() => {
        if (user) {
            setName(`${user.displayName}`)
            setEmail(`${user.email}`)
            setUserId(`${user.uid}`);
            setisLoggedin(true)
        } else {
            setisLoggedin(false)
        }
    }, [setisLoggedin, user])

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        const nav = document.getElementById("navbar");
        if (nav) {
            if (url.includes("/train")) {
                nav.style.background = "#000435";
            } else {
                nav.style.background = "transparent";
            }
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-ignore
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
            // @ts-ignore
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, closeDropdown, closeSidebar, sidebarRef]);

    useEffect(() => {
        if (isloggedin) {
            handleSendUserInfo()
        }
    }, [isloggedin, handleSendUserInfo])

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;

        if (url.includes("/train")) {
            let trainPageElement = document.getElementById("train-page");
            if (trainPageElement) {
                trainPageElement.style.color = '#f43f5e';
            }
        }
        else if (url.includes("/flight")) {
            let flightPageElement = document.getElementById("flight-page");
            if (flightPageElement) {
                flightPageElement.style.color = '#f43f5e';
            }
        }
        else if (url.includes("/")) {
            let homePageElement = document.getElementById("home-page");
            if (homePageElement) {
                homePageElement.style.color = '#f43f5e';
            }
        }
    }, [pathname, searchParams])

    return (
        <>
            <Suspense>{!isloggedin && <LoginForm />}</Suspense>
            <nav id="navbar" className="fixed w-screen top-0 opacity-100 z-30 font-Montserrat">
                <div className="flex items-center justify-between pl-4 md:pl-10 p-3">
                    <div className="flex items-center justify-center">
                        <Image
                            className="rounded-full"
                            src={logo}
                            width={40}
                            height={40}
                            alt="Logo"
                        />
                        <p className="font-bold ml-5 text-white text-xl">TOURISM</p>
                    </div>
                    <ul className="hidden md:flex md:mr-20 md:ml-40 space-x-5">
                        <li id="home-page" className="cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <a href="/" className="flex items-center">
                                    <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    Home
                                </a>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600"></span>
                            </p>
                        </li>
                        <li id="train-page" className="cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <a href="/train" className="flex items-center">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="none"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm280 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                                    Train</a>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </li>
                        <li id="flight-page" className="cursor-pointer">
                            <p className="text-lg m-6 group relative w-max">
                                <a href="/flight" className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                                    Flight
                                </a>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                            </p>
                        </li>
                    </ul>
                    <div className="hidden md:flex items-center text-gray-300">
                        {isloggedin ? (
                            <p onClick={() => toggleDropdown()} className="flex space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
                                <span>{name}</span>
                                <svg className={`${showDropdown ? "rotate-90" : ""} duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360 280-560h400L480-360Z" /></svg>
                            </p>
                        ) : (
                            <ul className="flex space-x-5">
                                <li id="login">
                                    <button
                                        onClick={() => setisLoggedin(false)}
                                        className="flex items-center gap-2 z-10 cursor-pointer relative px-8 py-2 rounded-md bg-inherit isolation-auto border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>
                                        <span>Login / Signup</span>
                                    </button>
                                </li>
                            </ul >
                        )}
                    </div>
                    <div onClick={() => handleLogout()} id="logout" className="cursor-pointer fixed right-14 top-24">
                        {showDropdown &&
                            <p className="text-gray-300 flex space-x-2 hover:bg-red-600 p-2 px-4 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                <span>Logout</span>
                            </p>
                        }
                    </div>

                    {/* Hamburger menu button */}
                    <div className="md:hidden items-center">
                        <button
                            className="text-white transition-transform ease-in-out duration-250 focus:outline-none"
                        >
                            {showMobileMenu ? (

                                <svg
                                    onClick={() => closeSidebar()}
                                    className="mt-2 w-6 h-6 transition-all duration-300  ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    fill="#e8eaed">
                                    <path
                                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    onClick={toggleMobileMenu}
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {showMobileMenu && (
                    <MobileMenu name={name} isloggedin={isloggedin} sidebarRef={sidebarRef} />
                )}

            </nav>
        </>
    )
}
