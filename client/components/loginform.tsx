import React, { FormEvent, useEffect, useState } from "react";
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Spinner } from "@nextui-org/react";

interface Props {
    visible: boolean;
}

const LoginForm: React.FC<Props> = ({ visible }) => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [isSignupForm, setIsSignupForm] = useState<Boolean>(false);
    const [showForm, setShowForm] = useState<Boolean>(!visible);

    //loaders
    const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
    const [loadingEmailPass, setLoadingEmailPass] = useState<boolean>(false);
    const [loadingSignup, setLoadingSignup] = useState<boolean>(false);

    const handleGoogleLogin = async () => {
        setLoadingGoogle(true);
        const res = await signInWithGoogle();
        setLoadingGoogle(false);
        setShowForm(false);
    }
    const handleEmailAndPassLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingEmailPass(true);
        const res = await signInWithEmailAndPassword(email, password);
        setLoadingEmailPass(false);
        setShowForm(false);
    };
    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingSignup(true);
        const res = await createUserWithEmailAndPassword(email, password);
        setLoadingSignup(false);
        setShowForm(false);
    };

    return (
        <>
            {showForm &&
                <div>
                    {isSignupForm ? (
                        <div className="w-full font-Montserrat text-white fixed right-4 z-50 top-10 bg-gray-900 max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <section className="flex justify-between mb-3">
                                <h1 className="font-bold text-xl">Signup</h1>
                                <svg onClick={() => setShowForm(false)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            </section>
                            <p className="border border-gray-700 w-full h-0"></p>
                            <form className="space-y-6 mt-3" onSubmit={handleSignup}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium  dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        className="bg-gray-50 text-gray-900 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
                                        Your password again
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Re-enter your password"
                                        className="bg-gray-50 text-gray-900 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center space-x-2 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span>Signup</span>
                                    {loadingSignup && <Spinner className="mt-1" color="warning" size="sm" />}
                                </button>
                            </form>
                            <section className="flex space-x-2 mt-5 ml-2">
                                <p>already a user?</p>
                                <p onClick={() => setIsSignupForm(false)} className="hover:underline text-blue-500 cursor-pointer">Login</p>
                            </section>
                        </div>
                    ) : (

                        <div className="w-full font-Montserrat text-white fixed right-4 z-50 top-10 bg-gray-900 max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <section className="flex justify-between mb-5">
                                <h1 className="font-bold text-xl">Login</h1>
                                <svg onClick={() => setShowForm(false)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            </section>
                            <p className="border border-gray-700 w-full h-0"></p>
                            <form className="space-y-6 mt-3" onSubmit={handleEmailAndPassLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium  dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 text-gray-900 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                            />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                        Lost Password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex space-x-2 items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span>Login</span>
                                    {loadingEmailPass && <Spinner className="mt-1" color="warning" size="sm" />}
                                </button>
                                <div className="flex justify-between items-center">
                                    <span className="border border-gray-700 h-0 w-32"></span>
                                    <span>or</span>
                                    <span className="border border-gray-700 h-0 w-32"></span>
                                </div>
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
                                <div className="text-sm flex space-x-2 font-medium text-gray-500 dark:text-gray-300">
                                    <p>
                                        Not registered?
                                    </p>
                                    <p onClick={() => setIsSignupForm(true)} className="text-blue-700 cursor-pointer hover:underline dark:text-blue-500">
                                        Create account
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            }
        </>
    );
}

export default LoginForm;