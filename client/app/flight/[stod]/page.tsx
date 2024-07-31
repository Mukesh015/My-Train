'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarSlug } from "@/components/navbarSlug"
import notFoundAnimation from "@/lottie/trainnotfound.json";
import dynamic from "next/dynamic";
import loadingAnimation from "@/lottie/loader.json";
import airports from "@/data/airports.json"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useRouter } from 'next/navigation';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { getFlightstod } from '@/app/api/amadues.api'
interface Props {
    params: {
        stod: string;
    };
}

interface flightStod {
    number: string;
    carrier: string;
}
const ChannelPage: React.FC<Props> = ({ params }) => {

    const [showNoFlight, setShowNoFlight] = useState<boolean>(false);
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
    const [flightinfo, setFlightInfo] = useState<flightStod | undefined>(undefined)
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
        const extractedInfo = flight.flatMap((flight: { itineraries: any[]; }) =>
            flight.itineraries.flatMap(itinerary =>
                itinerary.segments.map((segment: { number: any; carrierCode: any; }) => ({
                    number: segment.number,
                    carrierCode: segment.carrierCode
                }))
            )
        );
        setFlightInfo({ "carrier": extractedInfo.number, "number": extractedInfo.number })
    }, [response, setFlightDetails, flightDetails, setIsOpenFlightDetails, setFlightInfo]);

    const getCityByCode = (code: any) => {
        const airport = airports.find(a => a.code === code);
        return airport ? airport.city : 'Unknown';
    };

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
                setShowNoFlight(true);
            }
        }
    }, [params, setSourceCode, setShowNoFlight, setDestinationCode, setSelectedDate, setAdults, setChildren, setInfants, router]);

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
                <NavbarSlug />
                <div className='pb-10'>
                    {loading ? (
                        <div className="pt-[5rem] bg-[#000435] h-screen">
                            <Lottie className="h-80" animationData={loadingAnimation} />
                        </div>
                    ) : (
                        <div>
                            {showNoFlight ? (
                                <div className="max-h-screen">
                                    <Lottie className="h-[40rem] pt-28" animationData={notFoundAnimation} />
                                </div>
                            ) : (
                                <div>
                                    {
                                        response.map((flight: any, index: any) => {
                                            const { itineraries, price, id } = flight;
                                            const itinerary = itineraries[0];
                                            const segments = itinerary.segments;
                                            const firstSegment = segments[0];
                                            const lastSegment = segments[segments.length - 1];

                                            const { departure, arrival } = firstSegment;

                                            const totalDuration = formatDuration(itinerary.duration);

                                            const economyClassFare = price.total
                                                ? `${(price.total * 90.90).toFixed(2)} INR`
                                                : "Economy not Available";

                                            const businessClassFare = price.businessClassTotal
                                                ? `${(price.businessClassTotal * 90.90)} INR`
                                                : "Business not Available";

                                            return (
                                                <section key={id} className="ml-20 mr-20 border p-4 mb-7 rounded-md border-blue-950 shadow-gray-500 shadow-md">
                                                    <div className="mt-5 flex">
                                                        <h4 className="w-[500px] text-yellow-500">
                                                            {`${getCityByCode(departure.iataCode)} ( ${departure.iataCode} ) | ${new Date(departure.at).toLocaleTimeString()}`}
                                                        </h4>
                                                        <div>
                                                            <p className="flex items-center space-x-4 mr-[270px]">
                                                                <div className="border border-gray-500 w-16 h-0"></div>
                                                                <p>{totalDuration}</p>
                                                                <div className="border border-gray-500 w-16 h-0"></div>
                                                            </p>
                                                        </div>
                                                        <h5 className='text-yellow-500'>
                                                            {`${getCityByCode(lastSegment.arrival.iataCode)} (${lastSegment.arrival.iataCode}) | ${new Date(lastSegment.arrival.at).toLocaleTimeString()}`}
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
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div >
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
                            <ModalHeader>Flight Details</ModalHeader>
                            <ModalBody>
                                <div className="overflow-y-auto p-5 max-h-[400px]">
                                    <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
                                        {flightDetails.itineraries[0].segments.map(
                                            (segment: any, index: any) => (
                                                <li key={index} className="mb-10 ml-4">

                                                    {/* Departure Airport */}
                                                    <div className="flex items-center mb-4">
                                                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-500"></div>
                                                        <h4 className="text-lg font-semibold">
                                                            {segment.departure.iataCode}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-start flex-col mb-4 ml-6">
                                                        <p className="text-sm text-gray-500">Departure: {formatDate(segment.departure.at)}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Terminal: {segment.arrival.terminal || 'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Aircraft: {segment.aircraft.code}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Flight Number: {segment.carrierCode} {segment.number}
                                                        </p>
                                                    </div>

                                                    {/* Connection */}
                                                    {index < flightDetails.itineraries[0].segments.length - 1 && (
                                                        <div className="flex flex-col items-center ml-6">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                height="24px"
                                                                viewBox="0 -960 960 960"
                                                                width="24px"
                                                                fill="#e8eaed"
                                                            >
                                                                <path d="m397-115-99-184-184-99 71-70 145 25 102-102-317-135 84-86 385 68 124-124q23-23 57-23t57 23q23 23 23 56.5T822-709L697-584l68 384-85 85-136-317-102 102 26 144-71 71Z" />
                                                            </svg>
                                                        </div>
                                                    )}

                                                    {/* Arrival Airport */}
                                                    <div className="flex items-center mt-4 mb-4">
                                                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-500"></div>
                                                        <h4 className="text-lg font-semibold">
                                                            {segment.arrival.iataCode}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-start flex-col mb-4 ml-6">
                                                        <p className="text-sm text-gray-500">Arrival: {formatDate(segment.arrival.at)}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Terminal: {segment.arrival.terminal || 'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Duration: {formatDuration(segment.duration)}
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ol>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleModalClose}>
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
