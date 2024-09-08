import React, { memo, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { Spinner } from "@nextui-org/react";

const LoginForm: React.FC = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [showForm, setShowForm] = useState<Boolean>(true);

    //loaders
    const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);

    const handleGoogleLogin = async () => {
        setLoadingGoogle(true);
        const res = await signInWithGoogle();
        setLoadingGoogle(false);
    }

    return (
        <>{showForm &&
            <div className="w-[22rem] md:w-full font-Montserrat text-white  fixed right-4 z-50 top-20 bg-gray-900 max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <section className="flex justify-between mb-5">
                    <h1 className="font-bold text-xl">Login into our platform</h1>
                    <svg onClick={() => setShowForm(false)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </section>
                <p className="border border-gray-700 w-full mb-5 h-0"></p>
                <button
                    type="button"
                    className="text-white items-center w-full flex space-x-2 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    onClick={() => handleGoogleLogin()}
                >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Signin with google</span>
                    {loadingGoogle && <Spinner className="mt-1" color="warning" size="sm" />}
                </button>
            </div>
        }
        </>
    );
}

export default LoginForm;   