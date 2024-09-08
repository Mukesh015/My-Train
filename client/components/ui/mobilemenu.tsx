import React from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import Link from "next/link";
interface Props {
    isloggedin: boolean;
    name: string;
    toggleMenu: Function;
}
const variants = {
    hidden: {
        x: 400
    },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            duration: 0.5
        }
    }
}

const MobileMenu: React.FC<Props> = ({ isloggedin, name, toggleMenu }) => {

    const [signOut] = useSignOut(auth);
    const handleLogout = async () => {
        try {
            const res = await signOut();
        } catch (error) {
            console.log("firebase error", error);
        }
    };
    const handleToggleMenu = () => {
        toggleMenu();
    }

    return (
        <>
            <AnimatePresence>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    className="mobile-nav fixed  right-0 font-Montserrat text-gray-300 w-full h-full -z-10  items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                    <ol onClick={handleToggleMenu} className="space-y-10 pl-32">
                        <li className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
                            <span>{name ? name : "User"}</span>
                        </li>
                        <li className="flex space-x-2 items-center hover:text-blue-600">
                            <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="#e8eaed" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"></path></svg>
                            <Link href={"/"}>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="flex space-x-2 items-center hover:text-blue-600">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm280 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z" /></svg>
                            <Link href={"/train"}>
                                <span>Train</span>
                            </Link>
                        </li>
                        <li className="flex space-x-2 items-center hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z" /></svg>
                            <Link href={"/flight"}>
                                <span>Flight</span>
                            </Link>
                        </li>
                        {isloggedin &&
                            <li onClick={() => handleLogout()} className="flex space-x-2 items-center hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                <span>Logout</span>
                            </li>
                        }
                    </ol>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default MobileMenu;