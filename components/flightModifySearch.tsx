import React, { useCallback, useEffect, useState } from "react";
import SearchAutocomplete from "./From-search-autocomplete"
import { Input } from "@nextui-org/input";
import { useSelector } from 'react-redux';
import { RootState } from "@/lib/store";
import Traveller from "./travellers";
import { DatePicker } from "@nextui-org/react";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useRouter } from "next/navigation";



interface SearchState {
    keyword: string;
    city: boolean;
    airport: boolean;
    page: number;
}


export const FlightModifySearch = () => {
    const [search, setSearch] = useState<SearchState>({
        keyword: "a",
        city: true,
        airport: true,
        page: 0
    });
    const [sourceCode, setSourceCode] = useState('');
    const [isTraveller, setIsTraveller] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');
    const { adult, children, infants } = useSelector((state: RootState) => state.traveller);
    const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));
    const [destinationCode, setDestinationCode] = useState('');
    const router = useRouter()
    const handleTraveller = useCallback(() => {
        setIsTraveller(isTraveller => !isTraveller);
    }, []);
    useEffect(() => {

        setDefaultValue(`Adult-${adult}, Children-${children}, Infant-${infants}`);
    }, [adult, children, infants, defaultValue]);

    const formatDate = (date: DateValue): string => {
        const dateObj = date.toDate(getLocalTimeZone());
        return dateObj.toLocaleDateString("en-CA");
    };
    const handleModifySearch = useCallback(async () => {
        router.push(`/flight/SourceCode:${sourceCode} DestinationCode:${destinationCode} selectedDate:${formatDate(date)} adult:${adult} children: ${children} infants:${infants}`);
    }, [sourceCode, destinationCode, date, adult, children, infants, router]);



    return (
        <>
            <div className="absolute top-0 right-0 bottom-0 z-50 w-1/2 bg-gray-500 shadow-lg rounded-2xl ">
                <div className="font-serif text-black">
                    <p className="text-center mt-12 font-medium text-3xl">Modify Search</p>
                </div>
                
                <div className="flex justify-center items-center mt-4">
                    <div>
                        <div>

                            <p className="font-md font-serif text-xl text-black text-center mb-2">From:</p>
                            <SearchAutocomplete search={search} setSearch={setSearch} airportCode={sourceCode} setAirportCode={setSourceCode} />
                        </div>
                        <button className="outline-rose-700 ml-52 hover:bg-rose-500 outline rounded-full m-3">
                            <svg className="hover:-rotate-90 p-3 duration-300 rotate-90" xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
                        </button>
                        <div>
                            <p className="font-md font-serif text-xl text-black text-center mb-2">TO:</p>
                            <SearchAutocomplete search={search} setSearch={setSearch} airportCode={sourceCode} setAirportCode={setDestinationCode} />
                        </div>
                        <div>
                            <Input
                                key="full"
                                radius="full"
                                type="text"
                                label="Traveller"

                                value={defaultValue}
                                className="w-[450px] ml-1 mt-8 font-serif text-md mb-4"
                                onClick={handleTraveller}

                            />
                        </div>
                        <div className="flex flex-col ml-5 ">
                            <div className="flex flex-col">
                                <p className="mt-4 text-black font-serif">Choose date</p>
                                <div className="flex mb-4 w-full flex-wrap items-end md:flex-nowrap md:mb-0">
                                    <DatePicker
                                        value={date}
                                        onChange={setDate}

                                        className="max-w-[284px]"
                                        labelPlacement="outside"
                                    />
                                    <p className="text-sm ml-3 text-black">
                                        Selected date: {date ? formatDate(date) : "--"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="mt-8 rounded-full ml-8 w-[350px] text-white bg-[#d6255a] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex items-center justify-center h-14 dark:focus:ring-[#2557D6]/50 me-2 mb-2" onClick={() => handleModifySearch()}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                            <span className="pl-4 font-serif font-normal text-xl">Modify Search</span>
                        </button>

                    </div>
                </div>
            </div>
            {isTraveller && (
                <div style={{ position: "absolute", bottom: "70px", left: "500px", marginTop: "-10px", padding: "20px" }}>
                    <div style={{ backgroundColor: "#000000", padding: "10px", borderRadius: "8px", color: "#FFFFFF" }}>
                        <Traveller setIsTraveller={setIsTraveller} />
                    </div>
                </div>
            )}

        </>
    )
}


