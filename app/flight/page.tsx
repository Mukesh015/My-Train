'use client';
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import SearchAutocomplete from "@/components/search-autocomplete";
import { getAmadeusData } from "../api/amadues.api";
import axios from "axios";
import SearchCheckboxes from "@/components/search-checkbox";
import Traveller from "@/components/travellers";
import { DatePicker } from "@nextui-org/react";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useSelector } from 'react-redux';

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { RootState } from "@/lib/store";
import { Input } from "@nextui-org/input";

interface SearchState {
  keyword: string;
  city: boolean;
  airport: boolean;
  page: number;
}

const SearchRoot: React.FC = () => {
  const { adult, children, infants } = useSelector((state: RootState) => state.traveller);
  const router = useRouter();
  const [isTraveller, setIsTraveller] = useState(false);
  const [search, setSearch] = useState<SearchState>({
    keyword: "a",
    city: true,
    airport: true,
    page: 0
  });
  const [sourceCode, setSourceCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');

  const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));
  const [defaultValue, setDefaultValue] = useState('');
  const [dataSource, setDataSource] = useState<{ meta: { count: number }; data: any[] }>({
    meta: { count: 0 },
    data: []
  });

  const [loading, setLoading] = useState(false);


  const handleSearchFlight = useCallback(async () => {
    router.push(`/flight/SourceCode:${sourceCode} DestinationCode:${destinationCode} selectedDate:${formatDate(date)} adult:${adult} children: ${children} infants:${infants}`);
  }, [sourceCode, destinationCode, date, adult, children, infants, router]);

  const handleTraveller = useCallback(() => {
    setIsTraveller(isTraveller => !isTraveller);
  }, []);

  const formatDate = (date: DateValue): string => {
    const dateObj = date.toDate(getLocalTimeZone());
    return dateObj.toLocaleDateString("en-CA");
  };

  useEffect(() => {

    setDefaultValue(`Adult-${adult}, Children-${children}, Infant-${infants}`);
  }, [adult, children, infants,defaultValue]);



  useEffect(() => {
    setLoading(true);

    const { out, source } = getAmadeusData(search);

    out.then(res => {
      if (!res.data.code) {
        setDataSource(res.data);
      }
      setLoading(false);
    }).catch(err => {
      axios.isCancel(err);
      setLoading(false);
    });

    return () => {
      source.cancel();
    };
  }, [search]);
  
  return (
    <>
      <main className="font-Montserrat bg-[#000435] pb-[1px]">
        <header className="ml-14">
          <Navbar />
        </header>

        <div className="pt-32 pl-12 flex">
          <div className="">

            <div>
              <p className="font-md font-serif text-xl text-center mb-2">From:</p>
              <SearchAutocomplete search={search} setSearch={setSearch} airportCode={sourceCode} setAirportCode={setSourceCode} />
            </div>
            <button className="outline-rose-700 ml-52 hover:bg-rose-500 outline rounded-full m-3">
              <svg className="hover:-rotate-90 p-3 duration-300 rotate-90" xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
            </button>
            <p className="font-md font-serif text-xl text-center mb-2">TO:</p>
            <SearchAutocomplete search={search} setSearch={setSearch} airportCode={destinationCode} setAirportCode={setDestinationCode} />
            <Input
              key="full"
              radius="full"
              type="text"
              label="Traveller"
            
              value={defaultValue}
              className="w-[450px] ml-1 mt-8 font-serif text-md mb-4"
              onClick={handleTraveller}
            />
            <div className="flex flex-col ml-5 ">
              <div className="flex flex-col">
                <p className="mt-4">Choose date</p>
                <div className="flex mb-4 w-full flex-wrap items-end md:flex-nowrap md:mb-0">
                  <DatePicker
                    value={date}
                    onChange={setDate}

                    className="max-w-[284px]"
                    labelPlacement="outside"
                  />
                  <p className="text-sm ml-3 text-gray-500">
                    Selected date: {date ? formatDate(date) : "--"}
                  </p>
                </div>
              </div>
            </div>

            <SearchCheckboxes search={search} setSearch={setSearch} />

            <button type="button" className="mt-8 rounded-full ml-8 w-[350px] text-white bg-[#d6255a] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex items-center justify-center h-14 dark:focus:ring-[#2557D6]/50 me-2 mb-2" onClick={() => handleSearchFlight()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C">
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
              </svg>
              <span className="pl-4 font-serif font-normal text-xl">Search Flights</span>
            </button>
          </div>
        </div>

        {isTraveller && (
          <div style={{ position: "absolute", bottom: "50px", left: "520px", marginTop: "-10px", padding: "20px" }}>
            <div style={{ backgroundColor: "#000000", padding: "10px", borderRadius: "8px", color: "#FFFFFF" }}>
              <Traveller setIsTraveller={setIsTraveller} />
            </div>
          </div>
        )}
      </main >
    </>
  );
};

export default SearchRoot;
