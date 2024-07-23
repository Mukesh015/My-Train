'use client'
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import SearchAutocomplete from "@/components/search-autocomplete";
import { getAmadeusData } from "../api/amadues.api";
import axios from "axios"
import SearchCheckboxes from "@/components/search-checkbox";
import Traveller from "@/components/travellers"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import * as animationData from '@/lottie/Animation - 1721473491071.json'
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar";


const SearchRoot = () => {
  const { adult, children, infants } = useSelector((state) => state.traveller);
  const router = useRouter();

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTraveller, setIsTraveller] = useState(false);

  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [search, setSearch] = React.useState({
    keyword: "a",
    city: true,
    airport: true,
    page: 0
  });
  const [sourceCode, setSourceCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [response, setResponse] = useState([])

  const [dataSource, setDataSource] = React.useState({
    meta: { count: 0 },
    data: []
  });

  const [loading, setLoading] = React.useState(false)

  const handleDateClick = (date) => {

    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setIsCalendarOpen(false);
  };

  const handleSearchFlight = useCallback(async () => {


    router.push(`/flight/SourceCode:${sourceCode} DestinationCode:${destinationCode} selectedDate:${selectedDate} adult:${adult} children: ${children} infants:${infants}`)

  }, [setResponse, sourceCode, destinationCode, selectedDate, adult, children, infants]);


  const handleTraveller = useCallback(async () => {
    setIsTraveller(isTraveller => !isTraveller)

  }, [adult, children, infants])

  React.useEffect(() => {

    setLoading(true)



    const { out, source } = getAmadeusData(search);

    out.then(res => {

      if (!res.data.code) {
        setDataSource(res.data);

      }
      setLoading(false)
    }).catch(err => {
      axios.isCancel(err);
      setLoading(false)
    });

    return () => {
      source.cancel()
    };
  }, [search]);

  return (
    <>
      <div>
        <Navbar />

        <div style={{ position: 'fixed', pointerEvents: 'none', width: '100%', height: '100%', zIndex: -1 }}>
          <Lottie
            options={defaultOptions}
            isClickToPauseDisabled
          />
        </div>
        <div className="relative flex justify-end h-screen font-serif text-black">
          <div className="absolute bottom-32 left-10 w-auto h-auto bg-lime-400 p-4 rounded-lg">
            <div className="flex justify-around">
              <p className="mt-2 font-serif font-normal text-xl">From:</p>
              <p className="mt-2 font-serif font-normal text-xl">TO:</p>
            </div>
            <div className="flex justify-around items-center">
              <SearchAutocomplete search={search} setSearch={setSearch} sourceCode={sourceCode} setAirportCode={setSourceCode} />

              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="mx-4">
                <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
              </svg>

              <SearchAutocomplete search={search} setSearch={setSearch} destinationCode={destinationCode} setAirportCode={setDestinationCode} />
            </div>
            <SearchCheckboxes search={search} setSearch={setSearch} />

            {isCalendarOpen && (
              <div>
                <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} />
              </div>
            )}
            {isTraveller && (
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
                <div style={{ backgroundColor: "#000000", padding: "10px", borderRadius: "8px", color: "#FFFFFF" }}>
                  {/* Assuming Traveller is a component */}
                  <div>
                    <Traveller setIsTraveller={setIsTraveller} />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-5">
              <div className="relative w-48 mt-2">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="YYYY-MM-DD" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  <label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Departure Date
                  </label>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" onClick={() => setIsCalendarOpen(isCalendarOpen => !isCalendarOpen)} viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
              <div className="w-48 mt-2">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="" onClick={() => handleTraveller()} defaultValue={`Adult-${adult}, Children-${children}, Infant-${infants}`} /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Travellers
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className="mt-8 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  h-14 dark:focus:ring-[#2557D6]/50 me-2 mb-2" onClick={() => handleSearchFlight()} >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
                <a className="pl-4 font-serif font-normal text-xl">Search Flights</a>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-56 right-16 w-1/2 text-xl font-serif">
          <p className=" font-bold text-4xl text-lime-500  relative z-10 max-w-lg mx-auto my-2 ">The Sky is Waiting for You</p>
          <p className="mt-8 ">with cheapflights you can easily find flight to travel safely thanks to our detailed system of searching and booking airline tickets</p>

        <button className="relative mt-10 inline-flex bg-white items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <span className="text-gray-600 text-xl relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          
            Read More
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m560-241.33-47.33-47.34L672-448H160v-66.67h512l-160-160L559.33-722 800-481.33l-240 240Z"/></svg>
        </button>
        </div>
      </div>
    </>
  );
};

export default SearchRoot;