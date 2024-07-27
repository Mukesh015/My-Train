'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarSlug } from "@/components/navbarSlug"
import { FlightModifySearch } from '@/components/flightModifySearch'
import dynamic from "next/dynamic";
import loadingAnimation from "@/lottie/loader.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useRouter } from 'next/navigation';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { getFlightstod } from '@/app/api/amadues.api'
interface Props {
    params: {
        stod: string;
    };
}


const ChannelPage: React.FC<Props> = ({ params }) => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [destinationCode, setDestinationCode] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [response, setResponse] = useState<any[]>([]);
    const [adults, setAdults] = useState<number>(0);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);
    const [isOpenModifySearch, setIsOpenModifySearch] = useState<boolean>(false)
    const [isOpenFlightDetails, setIsOpenFlightDetails] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [flightDetails, setFlightDetails] = useState<any>(null);

    const handleModify = useCallback((newValue: boolean) => {
        setIsOpenModifySearch(newValue)
    }, [setIsOpenModifySearch, isOpenModifySearch])

    const formatDuration = (duration: string) => {
        const hours = parseInt(duration.substring(2, duration.indexOf('H')));
        const minutes = parseInt(duration.substring(duration.indexOf('H') + 1, duration.indexOf('M')));
        return `${hours}h ${minutes}m`;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };

    const handleFlightDetails = useCallback(async (id: any) => {
        const flight = response.find((flight: { id: any; }) => flight.id === id);
        setFlightDetails(flight);
        setIsOpenFlightDetails(true);
    }, [response, setFlightDetails, setIsOpenFlightDetails]);


    useEffect(() => {
        var dateObj = new Date(selectedDate);
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var dayOfWeek = weekdays[dateObj.getDay()];
        var day = dateObj.getDate();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[dateObj.getMonth()];
        var year = dateObj.getFullYear();
        var formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;
        setFormattedDate(formattedDate)

    }, [selectedDate, setFormattedDate])

    const handleModalClose = useCallback(() => {
        setIsOpenFlightDetails(false);
    }, [setIsOpenFlightDetails])

    useEffect(() => {
        if (params && params.stod) {
            const decodedId = decodeURIComponent(params.stod);
            const regex = /SourceCode:\s*([^ ]+)\s+DestinationCode:\s*([^ ]+)\s+selectedDate:\s*([^ ]+)\s+adults?:\s*(\d+)\s+children:\s*(\d+)\s+infants:\s*(\d+)/;
            const match = decodedId.match(regex);

            if (match) {
                const [, source, destination, date, adultCount, childrenCount, infantCount] = match;
                setSourceCode(source);
                setDestinationCode(destination);
                setSelectedDate(date);
                setAdults(parseInt(adultCount, 10));
                setChildren(parseInt(childrenCount, 10));
                setInfants(parseInt(infantCount, 10));
            } else {
                toast.warn('Make sure you’ve correctly input the departure and arrival cities, dates, and other relevant information', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
                setTimeout(() => {
                    router.push('/flight')
                }, 5000)
            }
        }
    }, [params, setSourceCode, setDestinationCode, setSelectedDate, setAdults, setChildren, setInfants, router]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const params = {
                    sourceCode: sourceCode,
                    destinationCode: destinationCode,
                    selectedDate: selectedDate,
                    adults: adults,
                    children: children,
                    infants: infants
                };
                const { out, source } = getFlightstod(params);
                const response = await out;
                console.log(response.data);
                setResponse(response.data);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        }
        if (sourceCode && destinationCode && formattedDate) {
            fetchData();
        }
        else {
            setLoading(true);
        }

    }, [sourceCode, destinationCode, selectedDate, adults, children, infants, setResponse, formattedDate, setLoading]);


    return (
        <>
            <div className="font-Montserrat bg-[#000435]">
                <NavbarSlug SourceCode={sourceCode} DestinationCode={destinationCode} selectedDate={selectedDate} adults={adults} children={children} infants={infants} onModifySearchChange={handleModify} />
                <div className=''>
                    {loading ? (
                        <div className="pt-[5rem] bg-[#000435] h-screen">
                            <Lottie className="h-80" animationData={loadingAnimation} />
                        </div>
                    ) : (
                        <>
                            {
                                response.map((flight: any, index: any) => {
                                    const { itineraries, price, id } = flight;
                                    const itinerary = itineraries[0];
                                    const segments = itinerary.segments;
                                    const firstSegment = segments[0];
                                    const lastSegment = segments[segments.length - 1];

                                    const { departure, arrival } = firstSegment;

                                    const totalDuration = formatDuration(itinerary.duration);
                                    const numberOfStops = segments.length - 1;

                                    const economyClassFare = price.total
                                        ? `${(price.total * 90.90).toFixed(2)} INR`
                                        : "Economy not Available";

                                    const businessClassFare = price.businessClassTotal
                                        ? `${(price.businessClassTotal * 90.90)} INR`
                                        : "Business not Available";

                                    return (
                                        <section className="ml-20 mr-20 border p-4 mb-7 rounded-md border-blue-950 shadow-gray-500 shadow-md">
                                            <div key={index} className="mt-5 flex">
                                                <h4 className="w-[600px]">
                                                    {departure.iataCode} | {new Date(departure.at).toLocaleTimeString()}
                                                </h4>
                                                <div>
                                                    <p className="flex items-center space-x-4 mr-[400px]">
                                                        <span className="flex-1 text-center">----------</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="flex-shrink-0">
                                                            <path d="m397-115-99-184-184-99 71-70 145 25 102-102-317-135 84-86 385 68 124-124q23-23 57-23t57 23q23 23 23 56.5T822-709L697-584l68 384-85 85-136-317-102 102 26 144-71 71Z" />
                                                        </svg>
                                                        <span className="flex-1 text-center">----------</span>
                                                    </p>
                                                    <p>{numberOfStops} stop{numberOfStops !== 1 && 's'} {totalDuration}</p>
                                                </div>
                                                <h5>
                                                    {lastSegment.arrival.iataCode} | {new Date(lastSegment.arrival.at).toLocaleTimeString()}
                                                </h5>
                                            </div>
                                            <div className="space-x-5 mt-5 flex ">
                                                <Button radius="md">{economyClassFare}</Button>
                                                <Button radius="md">{businessClassFare}</Button>
                                            </div>
                                            <div className="mt-5 text-gray-500 flex items-center space-x-5">
                                                <p className="text-small">
                                                    Please check NTES website or NTES app for actual time before boarding
                                                </p>
                                                <button
                                                    className="cursor-pointer rounded-md relative group overflow-hidden border-2 px-6 py-1 border-green-500"
                                                    onClick={() => handleFlightDetails(id)}
                                                >
                                                    <span className="font-bold text-white text-md relative z-10 group-hover:text-green-500 duration-500">
                                                        Flight Details
                                                    </span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-y-full h-full"></span>
                                                    <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                                                </button>
                                            </div>
                                        </section>
                                    );
                                })
                            }
                        </>
                    )}
                </div>
            </div>
            <Modal
                className="bg-black"
                size="4xl"
                backdrop="transparent"
                isOpen={isOpenFlightDetails}
                onClose={handleModalClose}
            >
                <ModalContent>
                    {isOpenFlightDetails && (
                        <>
                            <ModalHeader className="flex flex-col justify-center items-center gap-1">
                                Flight Details
                                <p className='mt-2'>{sourceCode} to {destinationCode}</p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="overflow-y-auto p-5 max-h-[400px]">
                                    <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
                                        {flightDetails.itineraries[0].segments.map((segment: any, index: any) => (
                                            <li key={index} className="mb-10 ml-4 flex flex-col items-start">
                                                <div className="flex items-center mb-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold">{segment.departure.iataCode} to {segment.arrival.iataCode}</h4>
                                                        <p className="mt-2">{formatDate(segment.departure.at)} - {formatDate(segment.arrival.at)}</p>
                                                        <time className="block mb-1 mt-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDuration(segment.duration)}</time>
                                                    </div>
                                                </div>
                                                {index < flightDetails.itineraries[0].segments.length - 1 && (
                                                    <div className="flex flex-col items-center mr-4 mb-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                                            <path d="m397-115-99-184-184-99 71-70 145 25 102-102-317-135 84-86 385 68 124-124q23-23 57-23t57 23q23 23 23 56.5T822-709L697-584l68 384-85 85-136-317-102 102 26 144-71 71Z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-500">Duration: {formatDuration(segment.duration)}</span>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="flex flex-col items-start mt-4">
                                        <h4 className="text-lg font-semibold">Final Arrival:</h4>
                                        <p className="mt-2">Airport: {flightDetails.itineraries[0].segments[flightDetails.itineraries[0].segments.length - 1].arrival.iataCode}</p>
                                        <p className="mt-2">Time: {new Date(flightDetails.itineraries[0].segments[flightDetails.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString()}</p>
                                        <p className="mt-2">Total Duration: {formatDuration(flightDetails.itineraries[0].duration)}</p>
                                        <p className="mt-2">Number of Stops: {flightDetails.itineraries[0].segments.length - 1}</p>
                                    </div>
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
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChannelPage;
