'use client'
import React from "react";
import { useState } from "react";
import SearchTable from "@/components/search-table";
import SearchAutocomplete from "@/components/search-autocomplete";
import { getAmadeusData } from "../api/amadues.api";
import axios from "axios"
import SearchCheckboxes from "@/components/search-checkbox";
import Traveller from "@/components/travellers"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// Main component 
const SearchRoot = () => {

  /* 
    With new React API we can define state in functional component like this *React.useState*
    1. first element in desctructured array - state itself
    2. second element - dispatch func, that allows us to change state
    3. we can create as many states as we need
  */
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

  const [dataSource, setDataSource] = React.useState({
    meta: { count: 0 },
    data: []
  });

  const [loading, setLoading] = React.useState(false)

  const handleDateClick = (date) => {
    // Format the selected date to YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setIsCalendarOpen(false); // Close the calendar
  };

  /* 
    Also React has lifecycle methods. On of them is *useEffect* - the same as ComponentDidMount | ComponentDidUpdate | ComponentWillUnmount in className components 
    1. First argument is callback func, we define there all logic we need to execute when component mounts
    2. Second argument - array of dependencies. If one of them changing - we executing callback func again

    ** If Array is empty - callback will execute only once, when mount
    ** If you not including second argument - callback will execute each time, when component will change

    3. We can create as many *useEffect* funcs, as we need
  */

  React.useEffect(() => {
    // Turn on loader animation
    setLoading(true)


    /* Getting data from amadeus api.
       out - our data that coming from backend.
       source - token for cancelation request.
    */

    const { out, source } = getAmadeusData(search);

    out.then(res => {
      // If we send too many request to the api per second - we will get an error and app will break
      // Therefore we implemented simple check to prevent error on client side.
      if (!res.data.code) {
        setDataSource(res.data); // dispatching data to components state
      }
      setLoading(false)
    }).catch(err => {
      axios.isCancel(err);
      setLoading(false)
    });

    // If we returning function from *useEffect* - then this func will execute, when component will unmount
    return () => {
      source.cancel()
    };
  }, [search]);

  return (
    <div className="container">
      <div className="container min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/flight-search-bg.jpg')" }}>
        <div className="search-panel"></div>
        <div className="search-panel">
          <SearchAutocomplete search={search} setSearch={setSearch} />
          <SearchCheckboxes search={search} setSearch={setSearch} />
        </div>
        <div className="relative flex justify-end h-screen">
          <div className="absolute bottom-48 left-10 w-auto h-auto bg-lime-400 p-4">
            <div className="flex justify-around">
              <p className="mt-2 font-serif font-normal text-xl">From:</p>
              <p className="mt-2 font-serif font-normal text-xl">TO:</p>
            </div>
            <div className="flex justify-around items-center">
              <SearchAutocomplete search={search} setSearch={setSearch} />

              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="mx-4">
                <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
              </svg>

              <SearchAutocomplete search={search} setSearch={setSearch} />
            </div>
            {isCalendarOpen && (
              <div>
                <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} />
              </div>
            )}
            {isTraveller && (
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
                <div style={{ backgroundColor: "#FFFFFF", padding: "10px", borderRadius: "8px" }}>

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
                    placeholder=" " onClick={() => setIsTraveller(isTraveller => !isTraveller)} /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Travellers
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <SearchTable dataSource={dataSource} search={search} setSearch={setSearch} loading={loading} /> */}
      </div>
    </div>
  );
};

export default SearchRoot;