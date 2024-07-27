'use client';
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { FromSearchAutocomplete,ToSearchAutocomplete } from "@/components/search-autocomplete";
import { getAmadeusData } from "../api/amadues.api";
import axios from "axios";
import SearchCheckboxes from "@/components/search-checkbox";
import Traveller from "@/components/travellers";
import { Checkbox, DatePicker } from "@nextui-org/react";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { Input } from "@nextui-org/input";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlightCards } from "@/components/skeleton";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Counter from "@/components/ui/counter";

interface SearchState {
  keyword: string;
  city: boolean;
  airport: boolean;
  page: number;
}

const SearchRoot: React.FC = () => {

  const words = [
    {
      text: "Serach",
      className: "text-white",
    },
    {
      text: "your",
      className: "text-white",
    },
    {
      text: "flights",
      className: "text-white",
    },
    {
      text: "with",
      className: "text-white",
    },
    {
      text: "Tourism.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
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
  }, [adult, children, infants, defaultValue]);



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
      <main className="font-Montserrat bg-[#000435] pb-[1px] h-screen">
        <header className="ml-14">
          {/* <Navbar /> */}
        </header>

        <div className="pt-32 pl-16 flex">
          <div className="">
            <div className="w-[20px]">
              <FromSearchAutocomplete search={search} setSearch={setSearch} airportCode={sourceCode} setAirportCode={setSourceCode} />
            </div>
            <button className="outline-rose-700 ml-44 hover:bg-rose-500 outline rounded-full m-3">
              <svg className="hover:-rotate-90 p-3 duration-700 ease-in-out rotate-90" xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#e8eaed"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg>
            </button>
            <ToSearchAutocomplete search={search} setSearch={setSearch} airportCode={destinationCode} setAirportCode={setDestinationCode} />
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <Input
                  type="text"
                  label="Traveller"
                  value={defaultValue}
                  className="mt-5 text-md p-1 mb-4"
                  onClick={handleTraveller}
                />
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                {(titleProps) => (
                  <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground" {...titleProps}>
                      Add passengers
                    </p>
                    <div className=" text-gray-500 mt-5 space-y-3">
                      <div className="flex space-x-7">
                        <p>Adult</p>
                        <Counter />
                      </div>
                      <div className="flex space-x-7">
                        <p>Child</p>
                        <Counter />
                      </div>
                      <div className="flex space-x-6">
                        <p>Infant</p>
                        <Counter />
                      </div>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <div className="flex flex-col mt-5 ml-1">
              <div className="flex flex-col">
                <div className="flex mb-4 w-full flex-wrap items-end md:flex-nowrap md:mb-0">
                  <DatePicker
                    value={date}
                    onChange={setDate}

                    className="max-w-[284px]"
                    labelPlacement="outside"
                  />
                </div>
                <p className="text-sm mt-3 ml-1 text-gray-500">
                  Selected date: {date ? formatDate(date) : "--"}
                </p>
              </div>
            </div>

            {/* <SearchCheckboxes search={search} setSearch={setSearch} /> */}
            <div className="mt-8 ml-1 space-y-2">
              <p>
                <span>
                  <Checkbox
                    isSelected
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>Search with city</span>
              </p>
              <p>
                <span>
                  <Checkbox
                    isSelected
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>Search with Airport</span>
              </p>
            </div>
            <button
              onClick={() => handleSearchFlight()}
              className="ml-20 mt-10 py-2 px-14 text-black text-base font-bold nded-full overflow-hidden bg-rose-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Search Flights
            </button>
          </div>
          <div className="ml-[50px] mt-10">
            <div className="flex flex-col items-center justify-center h-[5rem]  ">
              <p className="text-lime-600 dark:text-neutral-200 text-xs sm:text-base  ">
                The road to freedom starts from here
              </p>
              <TypewriterEffectSmooth words={words} />
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
            </div>
            <div className="h-[30rem] py-2">
              <LayoutGrid cards={FlightCards} />
            </div>
          </div>
        </div>
        {/* {isTraveller && (
          <div style={{ position: "absolute", bottom: "50px", left: "520px", marginTop: "-10px", padding: "20px" }}>
            <div style={{ backgroundColor: "#000000", padding: "10px", borderRadius: "8px", color: "#FFFFFF" }}>
              <Traveller setIsTraveller={setIsTraveller} />
            </div>
          </div>
        )} */}
      </main >
    </>
  );
};

export default SearchRoot;
