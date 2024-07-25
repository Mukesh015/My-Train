'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarSlug } from "@/components/navbarSlug"
import { FlightModifySearch } from '@/components/flightModifySearch'
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

    const [adults, setAdults] = useState<number>(0);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);
    const [isOpenModifySearch, setIsOpenModifySearch] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (params && params.stod) {
            const decodedId = decodeURIComponent(params.stod);


            // Extracting parameters using regex
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
            }
        }
    }, [params, setSourceCode, setDestinationCode, setSelectedDate, setAdults, setChildren, setInfants]);


    const handleModify = useCallback((newValue: boolean) => {
        setIsOpenModifySearch(newValue)
    }, [setIsOpenModifySearch, isOpenModifySearch])

    useEffect(() => {
        const fetchData = async () => {
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
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [sourceCode, destinationCode, selectedDate, adults, children, infants]);


    return (
        <div className="font-Montserrat h-screen w-full rounded-md bg-neutral-950 relative flex flex-col antialiased">
            <ToastContainer />

            <NavbarSlug SourceCode={sourceCode} DestinationCode={destinationCode} selectedDate={selectedDate} adults={adults} children={children} infants={infants} onModifySearchChange={handleModify} />

            {isOpenModifySearch && (
                <div >

                    <FlightModifySearch />

                </div>
            )}

            <div className='mt-32 ml-4'>
                <p className='flex justify-start '>{formattedDate}</p>
                <p className='text-3xl font-serif mt-4 '>Select your Departure flight from </p>
                <div className='flex justify-start text-3xl font-serif'>
                    <p className=''>from </p>

                    <p className=' text-orange-700 ml-4'>{sourceCode} </p>
                    <p className='ml-4'>to </p>
                    <p className='ml-4  text-orange-700'>{destinationCode} </p>
                </div>
            </div>


        </div>
    );
};

export default ChannelPage;
