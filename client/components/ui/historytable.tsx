import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { auth } from "@/lib/firebase/config";

export default function HistoryTable() {
    const [user] = useAuthState(auth);
    const [userId, setUserId] = useState<string>("");
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const calculateTimeAgo = (dateString: string) => {
        return moment(dateString).fromNow();
    };

    const handleFetchData = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/user/${userId}/history`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error("Server responded with a bad response");
                setLoading(false);
                return;
            }

            const data = await response.json();
            setHistoryData(data.data.recentTrains || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            handleFetchData();
        }
    }, [user, setUserId, handleFetchData]);

    return (
        <div className="p-4 md:p-0">
            <section className="border rounded-lg border-slate-600 w-full md:w-[50rem] h-[33rem] overflow-y-auto ">
                <h1 className="p-5 flex items-center space-x-3 text-xl font-semibold text-pretty text-yellow-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFF55"
                    >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                    <span>Recent searches</span>
                </h1>
                {historyData.length > 0 ? (
                    <div>
                        {historyData.map((train, index) => (
                            <div
                                key={index}
                                className="p-5 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4 hover:bg-slate-800 cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                    <p className="w-28">
                                        <span className="bg-red-500 py-0.5 px-2 font-bold rounded-md">
                                            {train.trainNo}
                                        </span>
                                    </p>
                                    <p className="w-full md:w-[20rem] capitalize">
                                        {train.trainName}
                                    </p>
                                    <p className="w-full md:w-[10rem]">
                                        {calculateTimeAgo(train.date)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#e8eaed"
                                    >
                                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-5">No data to show</p>
                )}
            </section>
        </div>
    );
}
