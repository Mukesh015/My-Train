"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import react, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar';
import loadingAnimation from "@/lottie/loader.json"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from "next/dynamic";


const TrainResult = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [trainResult, setTrainResult] = useState([]);
    const [trainRoute, setTrainRoute] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [routeLoading, setRouteLoading] = useState<boolean>(true);

    const searchParams = useSearchParams()
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    function formatDate(inputDate: any) {
        // Assuming inputDate is in the format yyyy-mm-dd
        const [year, month, day] = inputDate.split('-');
        return `${day}-${month}-${year}`;
    }


    const handleSearchTrain = useCallback(async () => {
        const formatedDate = formatDate(date);
        console.log(formatedDate);
        try {
            const response = await fetch(`https://mytrainapiend.vercel.app/trains/gettrainon?from=${from}&to=${to}&date=${formatedDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTrainResult(data.data);
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Fetch failed", error)
        }
    }, [from, to, setTrainResult, setIsLoading]);

    const handleGetTrainRoute = useCallback(async (train_no: any) => {
        onOpen();
        try {
            const response = await fetch(`https://mytrainapiend.vercel.app/trains/getRoute?trainNo=${train_no.train_no}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTrainRoute(data.data);
                setRouteLoading(false);
            }
        } catch (error) {
            console.error("Fetch failed", error)
        }
    }, [setTrainRoute])

    const handleModalClose = () => {
        onClose();
        setRouteLoading(true);
        setTrainRoute([]);
    }

    useEffect(() => {
        handleSearchTrain();
    }, [from, to, setTrainResult]);

    return (
        <>
            <div className='font-Montserrat bg-[#000435] min-h-screen'>
                <div className='ml-14'>
                    <Navbar />
                </div>
                {isLoading ? (
                    <div className="pt-[13rem]">
                        <Lottie className="h-80" animationData={loadingAnimation} />
                    </div>
                ) : (

                    <div>
                        <div className='pt-32 pb-20'>
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
                                        className='mt-5 ml-20 mr-20 border p-4 rounded-md border-blue-950 shadow-gray-500 shadow-md'
                                    >
                                        <div className='flex font-semibold text-yellow-500'>
                                            <h1 className='w-[600px]'>
                                                {train_name} ({train_no})
                                            </h1>
                                            <h2 className='mr-[300px]'>Runs on : {renderRunningDays(running_days)}</h2>
                                            <h3 onClick={() => handleGetTrainRoute({ train_no })} className='text-blue-500 hover:underline cursor-pointer'>Train Route</h3>
                                        </div>
                                        <div className='mt-5 flex'>
                                            <h4 className='w-[600px]'>
                                                {from_time} | {from_stn_name}
                                            </h4>
                                            <p className='mr-[250px]'>---------- {travel_time} ----------</p>
                                            <h5>
                                                {to_time} | {to_stn_name}
                                            </h5>
                                        </div>
                                        <div className='space-x-5 mt-5'>
                                            <Button radius='md'>Second Sitting (2S)</Button>
                                            <Button radius='md'>Sleeper (SL)</Button>
                                            <Button radius='md'>AC Chair Car (CC)</Button>
                                            <Button radius='md'>AC First Class (1A)</Button>
                                            <Button radius='md'>AC 2 Tier (2A)</Button>
                                            <Button radius='md'>AC 3 Tier (3A)</Button>
                                            <Button radius='md'>AC 3 Economy (3E)</Button>
                                        </div>
                                        <div className='mt-5 text-gray-500 flex items-center space-x-5'>
                                            <p className='text-small'>
                                                Please check NTES website or NTES app for actual time before
                                                boarding
                                            </p>
                                            <button className='cursor-pointer rounded-md relative group overflow-hidden border-2 px-6 py-1 border-green-500'>
                                                <span className='font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500'>
                                                    Book
                                                </span>
                                                <span className='absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full'></span>
                                                <span className='absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full'></span>
                                                <span className='absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full'></span>
                                                <span className='absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full'></span>
                                            </button>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                        <Modal
                            className="bg-black"
                            size="4xl"
                            backdrop="transparent"
                            isOpen={isOpen}
                            onClose={handleModalClose}
                        >
                            <ModalContent>
                                {() => (
                                    <>
                                        {routeLoading ? (
                                            <Lottie className="h-80" animationData={loadingAnimation} />

                                        ) : (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Train Route</ModalHeader>
                                                <ModalBody>
                                                    {/* Show loading message if data is still fetching */}
                                                    <div className="overflow-y-auto max-h-[400px]"> {/* Added scrollable container */}
                                                        <Table isHeaderSticky removeWrapper aria-label="Train route table">
                                                            <TableHeader>
                                                                <TableColumn>SOURCE ST.</TableColumn>
                                                                <TableColumn>ST. CODE</TableColumn>
                                                                <TableColumn>Arrive</TableColumn>
                                                                <TableColumn>Depart</TableColumn>
                                                                <TableColumn>Distance (km)</TableColumn>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {
                                                                    trainRoute.map((route: any, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{route.source_stn_name}</TableCell>
                                                                            <TableCell>{route.source_stn_code}</TableCell>
                                                                            <TableCell>{route.arrive}</TableCell>
                                                                            <TableCell>{route.depart}</TableCell>
                                                                            <TableCell>{route.distance}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={handleModalClose}>
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
    )

}

const renderRunningDays = (days: any) => {
    const daysMap: any = {
        0: 'S',
        1: 'M',
        2: 'T',
        3: 'W',
        4: 'T',
        5: 'F',
        6: 'S',
    };

    return days
        .split('')
        .map((day: any, index: any) => (
            <span
                key={index}
                className={day === '1' ? 'text-yellow-500' : 'text-gray-400'}
            >

                {daysMap[index]}{' '}
            </span>
        ));
};

export default TrainResult;