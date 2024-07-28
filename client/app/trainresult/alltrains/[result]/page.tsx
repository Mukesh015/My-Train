"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import loadingAnimation from "@/lottie/loader.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import dynamic from "next/dynamic";
import notFoundAnimation from "@/lottie/trainnotfound.json";
import NextTopLoader from "nextjs-toploader";

const TrainResult = () => {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [currentStation, setCurrentStation] = useState<string>("");
    const [trainResult, setTrainResult] = useState([]);
    const [trainRoute, setTrainRoute] = useState([]);
    const [liveData, setLiveData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [routeLoading, setRouteLoading] = useState<boolean>(true);
    const [showNoTrain, setShowNoTrain] = useState<boolean>(false);
    const [isLiveModalVisible, setISLiveModalVisible] = useState<boolean>(false);

    function formatDate(inputDate: any) {
        const [year, month, day] = inputDate.split("-");
        return `${day}-${month}-${year}`;
    }

    // New function to convert time to a comparable numeric value
    const convertTimeToNumber = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const handleSearchTrain = useCallback(async () => {
        const formatedDate = formatDate(date);
        try {
            const response = await fetch(
                `https://api-endpoint-black.vercel.app/trains/gettrainon?from=${from}&to=${to}&date=${formatedDate}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data.success);
                if (data.success) {
                    // Sort trains by from_time in ascending order
                    const sortedTrains = data.data.sort(
                        (a: any, b: any) =>
                            convertTimeToNumber(a.train_base.from_time) -
                            convertTimeToNumber(b.train_base.from_time)
                    );
                    setTrainResult(sortedTrains);
                } else {
                    setShowNoTrain(true);
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Fetch failed", error);
        }
    }, [from, to, setTrainResult, setShowNoTrain, setIsLoading]);

    const handleGetTrainRoute = useCallback(
        async (train_no: any) => {
            onOpen();
            try {
                const response = await fetch(
                    `https://api-endpoint-black.vercel.app/trains/getRoute?trainNo=${train_no.train_no}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setTrainRoute(data.data);
                    setRouteLoading(false);
                }
            } catch (error) {
                console.error("Fetch failed", error);
            }
        },
        [setTrainRoute]
    );

    const handleFetchLivedata = async (train_no: any) => {
        onOpen();
        try {
            const response = await fetch(
                `https://api-endpoint-black.vercel.app/trains/livelocation/?train_no=${train_no.train_no}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setLiveData(data.data);
                setCurrentStation(data.message);
                setISLiveModalVisible(true);
                setRouteLoading(false);
                console.log(data);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalClose = () => {
        onClose();
        setRouteLoading(true);
        if (isLiveModalVisible) {
            setISLiveModalVisible(false);
            setLiveData([]);
        } else {
            setTrainRoute([]);
        }
    };

    useEffect(() => {
        handleSearchTrain();
    }, [from, to, setTrainResult]);

    return (
        <>
            <NextTopLoader />
            <div className="font-Montserrat bg-[#000435] min-h-screen z-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:rounded-full">
                {isLoading ? (
                    <div className="pt-[13rem]">
                        <Lottie className="h-80" animationData={loadingAnimation} />
                    </div>
                ) : (
                    <div>
                        {showNoTrain ? (
                            <div className="max-h-screen">
                                <Lottie className="h-[40rem] pt-28" animationData={notFoundAnimation} />
                            </div>
                        ) : (
                            <div className="pt-32 pb-20">
                                {trainResult.map((train, index) => {
                                    const {
                                        train_no,
                                        train_name,
                                        from_stn_name,
                                        from_time,
                                        to_stn_name,
                                        to_time,
                                        travel_time,
                                        running_days,
                                        // @ts-ignore
                                    } = train.train_base;

                                    return (
                                        <section
                                            key={index}
                                            className="mt-5 ml-20 mr-20 border p-4 rounded-md border-blue-950 shadow-gray-500 shadow-md"
                                        >
                                            <div className="flex font-semibold text-yellow-500">
                                                <h1 className="w-[600px]">
                                                    {train_name} ({train_no})
                                                </h1>
                                                <h2 className="mr-[300px]">Runs on : {renderRunningDays(running_days)}</h2>
                                                <h3
                                                    onClick={() => handleGetTrainRoute({ train_no })}
                                                    className="text-blue-500 hover:underline cursor-pointer"
                                                >
                                                    Train Route
                                                </h3>
                                            </div>
                                            <div className="mt-5 flex">
                                                <h4 className="w-[600px]">
                                                    {from_time} | {from_stn_name}
                                                </h4>
                                                <p className="mr-[250px]">
                                                    ---------- {travel_time} ----------
                                                </p>
                                                <h5>
                                                    {to_time} | {to_stn_name}
                                                </h5>
                                            </div>
                                            <div className="space-x-5 mt-5">
                                                <Button radius="md">Second Sitting (2S)</Button>
                                                <Button radius="md">Sleeper (SL)</Button>
                                                <Button radius="md">AC Chair Car (CC)</Button>
                                                <Button radius="md">AC First Class (1A)</Button>
                                                <Button radius="md">AC 2 Tier (2A)</Button>
                                                <Button radius="md">AC 3 Tier (3A)</Button>
                                                <Button radius="md">AC 3 Economy (3E)</Button>
                                            </div>
                                            <div className="mt-5 text-gray-500 flex items-center space-x-5">
                                                <p className="text-small">
                                                    Please check NTES website or NTES app for actual time before boarding
                                                </p>
                                                <button
                                                    onClick={() => handleFetchLivedata({ train_no })}
                                                    className="cursor-pointer rounded-md relative group overflow-hidden border-2 px-6 py-1 border-green-500"
                                                >
                                                    <span className="font-bold text-white text-md relative z-10 group-hover:text-green-500 duration-500">
                                                        See live location
                                                    </span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-y-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                                                </button>
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        )}

                        <Modal
                            className="bg-black [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:rounded-full"
                            size="4xl"
                            backdrop="transparent"
                            isOpen={isOpen}
                            onClose={handleModalClose}
                        >
                            <ModalContent>
                                {isLiveModalVisible ? (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Live Location
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="overflow-y-auto p-5 max-h-[400px]">
                                                <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
                                                    {liveData.map((station: any, index: number) => {
                                                        const { station_name, distance, timing, delay, is_current_station } =
                                                            station;
                                                        const [arrival, departure] = formatTiming(timing);
                                                        return (
                                                            <li
                                                                key={index}
                                                                className={`mb-10 ml-4 ${is_current_station ? "current-station" : ""
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white ${is_current_station
                                                                        ? "bg-blue-500 border-none pulse-animation"
                                                                        : "bg-gray-200 dark:bg-gray-700"
                                                                        }`}
                                                                ></div>
                                                                <div className="flex items-center space-x-2">
                                                                    <h4 className="text-lg font-semibold">
                                                                        {station_name}
                                                                    </h4>
                                                                    {currentStation.includes(station_name) ? (
                                                                        <span className="text-sm text-blue-500 animate-pulse">
                                                                            (Current Station)
                                                                        </span>
                                                                    ) : (null)}
                                                                </div>
                                                                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                                    Expected Arrival: {arrival} | Departure: {departure}
                                                                </time>
                                                                <p className="text-sm text-gray-600">
                                                                    Distance: {distance} | Delay: {delay}
                                                                </p>
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={handleModalClose}
                                            >
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </>
                                ) : (
                                    <>
                                        {routeLoading ? (
                                            <Lottie className="h-80" animationData={loadingAnimation} />
                                        ) : (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    Train Route
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div className="overflow-y-auto max-h-[400px]">
                                                        <Table
                                                            isHeaderSticky
                                                            removeWrapper
                                                            aria-label="Train route table"
                                                        >
                                                            <TableHeader>
                                                                <TableColumn>SOURCE ST.</TableColumn>
                                                                <TableColumn>ST. CODE</TableColumn>
                                                                <TableColumn>Arrive</TableColumn>
                                                                <TableColumn>Depart</TableColumn>
                                                                <TableColumn>Distance (km)</TableColumn>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {trainRoute.map((route: any, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{route.source_stn_name}</TableCell>
                                                                        <TableCell>{route.source_stn_code}</TableCell>
                                                                        <TableCell>{route.arrive}</TableCell>
                                                                        <TableCell>{route.depart}</TableCell>
                                                                        <TableCell>{route.distance}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button
                                                        color="danger"
                                                        variant="light"
                                                        onPress={handleModalClose}
                                                    >
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                )}
            </div>
        </>
    );
};

const formatTiming = (timing: string): [string, string] => {
    let arrival = "N/A";
    let departure = "N/A";

    if (timing) {
        departure = timing.substring(0, 5); // First part (HH:MM)
        arrival = timing.substring(5, 10); // Second part (HH:MM)
    }

    return [arrival, departure];
};

const renderRunningDays = (days: any) => {
    const daysMap: any = {
        0: "S",
        1: "M",
        2: "T",
        3: "W",
        4: "T",
        5: "F",
        6: "S",
    };

    return days.split("").map((day: any, index: any) => (
        <span key={index} className={day === "1" ? "text-yellow-500" : "text-gray-400"}>
            {daysMap[index]}{" "}
        </span>
    ));
};

export default TrainResult;
