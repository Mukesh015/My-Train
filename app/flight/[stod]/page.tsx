'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarSlug } from "@/components/navbarSlug"
import { FlightModifySearch } from '@/components/flightModifySearch'

interface Props {
    params: {
        stod: string;
    };
}

const ChannelPage: React.FC<Props> = ({ params }) => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [destinationCode, setDestinationCode] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [adults, setAdults] = useState<number>(0);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);
    const [isOpenModifySearch, setIsOpenModifySearch] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

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



    return (
        <div className='h-screen bg-black'>
            <ToastContainer />
            <NavbarSlug SourceCode={sourceCode} DestinationCode={destinationCode} selectedDate={selectedDate} adults={adults} children={children} infants={infants} onModifySearchChange={handleModify} />
            {isOpenModifySearch && (
                <div >

                    <FlightModifySearch   />

                </div>
            )}

        </div>
    );
};

export default ChannelPage;
