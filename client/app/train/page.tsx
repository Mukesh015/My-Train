"use client";

import { Input, Spinner } from "@nextui-org/react";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import stationData from "@/data/stationcode.json";
import { TrainCards, words } from "@/components/skeleton"
import NextTopLoader from 'nextjs-toploader';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const TrainComponent = lazy(() => import("@/components/ui/historytable"))
import { useLocation } from "@/lib/cityprovider";
import "../globals.css"


interface Station {
  name: string;
  code: string;
}

interface StationData {
  data: Station[];
}

export default function TrainPage() {
  const { setSource, setDestination } = useLocation();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [showLoadingBtn, setShowLoadingBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [toInputValue, setToInputValue] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<Station[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Station[]>([]);
  const [fromStation, setFromStation] = useState<string | null>(null);
  const [toStation, setToStation] = useState<string | null>(null);
  const [date, setDate] = React.useState<DateValue>(parseDate(new Date().toISOString().split("T")[0]));
  const [disabilityCheckBox, setDisabilityCheckBox] = useState<boolean>(false);
  const [berthAvailabilityCheckBox, setBerthAvailabilityCheckBox] = useState<boolean>(false);
  const [dateFlexibleCheckBox, setDateFlexibleCheckBox] = useState<boolean>(false);
  const [concesssionCheckBox, setConcesssionCheckBox] = useState<boolean>(false);
  let formatter = useDateFormatter({ dateStyle: "full" });


  const handleDisabilityCheckBox = () => {
    setDisabilityCheckBox(!disabilityCheckBox);
  };

  const handleBerthAvailabilityCheckBox = () => {
    setBerthAvailabilityCheckBox(!berthAvailabilityCheckBox);
  };

  const handleDateFlexibleCheckBox = () => {
    setDateFlexibleCheckBox(!dateFlexibleCheckBox);
  };

  const handleConcessionCheckBox = () => {
    setConcesssionCheckBox(!concesssionCheckBox);
  };

  const handleSearchTrain = useCallback(async () => {
    if (!fromStation && !toStation) {
      return;
    }
    setSource(inputValue);
    setDestination(toInputValue);
    setShowLoadingBtn(true);
    router.push(`/trainresult/alltrains/search?from=${fromStation}&to=${toStation}&date=${date}`);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/savetohistory`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: user?.id,
          from: fromStation,
          to: toStation,
        })
      });
      const data = await response.json();
      if (data.status) {
        console.log("Search query saved successfully", data);
      } else {
        console.error("Failed to save search query");
      }
    } catch (e) {
      console.error("Fetch errror", e);
    }
  }, [user, fromStation, toStation, setSource, setDestination]);

  const handleFromSuggestionClick = (suggestion: Station): void => {
    setInputValue(`${suggestion.name} (${suggestion.code})`);
    setFromSuggestions([]);
    setFromStation(suggestion.code);
  };

  const handleToSuggestionClick = (suggestion: Station): void => {
    setToInputValue(`${suggestion.name} (${suggestion.code})`);
    setToSuggestions([]);
    setToStation(suggestion.code);
  };

  const handleFromInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions: Station[] = (stationData as StationData).data
        .filter(
          (station) =>
            station.name.toLowerCase().includes(value.toLowerCase()) ||
            station.code.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 20);
      setFromSuggestions(filteredSuggestions);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setToInputValue(value);

    if (value) {
      const filteredSuggestions: Station[] = (stationData as StationData).data
        .filter(
          (station) =>
            station.name.toLowerCase().includes(value.toLowerCase()) ||
            station.code.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 20);
      setToSuggestions(filteredSuggestions);
    } else {
      setToSuggestions([]);
    }
  };

  const handleToggleStations = () => {
    const svg = document.getElementById("toggle-svg");
    svg?.classList.toggle("rotate-90");
    const tempFrom = fromStation;
    const tempTo = toStation;
    setFromStation(tempTo);
    setToStation(tempFrom);
    setInputValue(toInputValue);
    setToInputValue(inputValue);
  }


  return (
    <>
      <NextTopLoader />
      <main className="font-Montserrat bg-[#000435] pb-[25px] pt-20">
        <div className="pt-16 pl-6 md:2xl:pl-24 flex flex-col md:flex-row">
          <div>
            <div className="flex w-full md:w-[450px] flex-col justify-center items-center px-2 md:px-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-2 md:mb-0 mr-5 gap-2 md:gap-4 relative">
                <Input
                  value={inputValue}
                  onChange={handleFromInputChange}
                  type="text"
                  variant="flat"
                  label="Source Station"
                  autoComplete="off"
                  className="w-full" // Ensure full width on mobile
                />
                {fromSuggestions.length > 0 && (
                  <ul className="w-full md:w-[400px] absolute mt-16 z-50 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
                    {fromSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleFromSuggestionClick(suggestion)}
                        className="p-2 text-black cursor-pointer hover:bg-gray-300"
                      >
                        {suggestion.name} ({suggestion.code})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={() => handleToggleStations()}
              className="outline-rose-700 mx-auto md:ml-48 hover:bg-rose-500 outline rounded-full m-4 flex justify-center items-center"
            >
              <svg
                id="toggle-svg"
                className="p-1 duration-300 ease-in-out -rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="#e8eaed"
              >
                <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
              </svg>
            </button>
            <div className="flex w-full md:w-[450px] flex-col justify-center items-center px-2 md:px-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-2 md:mb-0 mr-5 gap-2 md:gap-4 relative">
                <Input
                  value={toInputValue}
                  onChange={handleToInputChange}
                  type="text"
                  variant="flat"
                  label="Destination Station"
                  autoComplete="off"
                  className="w-full" // Ensure full width on mobile
                />
                {toSuggestions.length > 0 && (
                  <ul className="w-full md:w-[400px] absolute mt-[4rem] z-50 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
                    {toSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleToSuggestionClick(suggestion)}
                        className="p-2 text-black cursor-pointer hover:bg-gray-300"
                      >
                        {suggestion.name} ({suggestion.code})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-2 max-w-[300px]">
              <div className="flex flex-col">
                <div className="mt-2 w-full items-end md:flex-nowrap md:mb-0">
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    label={"Train date"}
                    className="w-full md:w-[200px] lg:w-[250px]"
                    labelPlacement="outside"
                  />
                  <p className="text-sm ml-3 mt-2 text-gray-500">
                    Selected date: {date ? formatter.format(date.toDate(getLocalTimeZone())) : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-10 mx-auto md:ml-5 space-y-3">
              <p className="flex items-center space-x-2">
                <Checkbox
                  onClick={() => handleDisabilityCheckBox()}
                  isSelected={disabilityCheckBox}
                  className="text-rose-500"
                  defaultSelected
                  color="warning"
                />
                <span className="text-white text-sm md:text-base">Person with disability concession</span>
              </p>
              <p className="flex items-center space-x-2">
                <Checkbox
                  onClick={() => handleDateFlexibleCheckBox()}
                  isSelected={dateFlexibleCheckBox}
                  className="text-rose-500"
                  defaultSelected
                  color="warning"
                />
                <span className="text-white text-sm md:text-base">Flexible with date</span>
              </p>
              <p className="flex items-center space-x-2">
                <Checkbox
                  onClick={() => handleBerthAvailabilityCheckBox()}
                  isSelected={berthAvailabilityCheckBox}
                  className="text-rose-500"
                  defaultSelected
                  color="warning"
                />
                <span className="text-white text-sm md:text-base">Train with available berth</span>
              </p>
              <p className="flex items-center space-x-2">
                <Checkbox
                  onClick={() => handleConcessionCheckBox()}
                  isSelected={concesssionCheckBox}
                  className="text-rose-500"
                  defaultSelected
                  color="warning"
                />
                <span className="text-white text-sm md:text-base">Railway path concession</span>
              </p>
            </div>
            <button
              onClick={() => handleSearchTrain()}
              className="mx-auto md:ml-20 mt-6 md:mt-10 py-2 px-10 md:px-14 text-black text-base font-bold rounded-full overflow-hidden bg-rose-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              {showLoadingBtn ? (
                <section className="flex space-x-3">
                  <span>searching</span>
                  <Spinner color="warning" size="sm" />
                </section>
              ) : (
                <section className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                  <span>Search trains</span>
                </section>
              )}
            </button>
          </div>
          <div className="md:2xl:ml-20">
            <Suspense fallback={<div>Loading...</div>}>
              <TrainComponent />
            </Suspense>
          </div>
        </div>
        <div className="ml-0 md:ml-[50px] mt-20">
          <div className="flex flex-col items-center justify-center h-[5rem] space-y-2 md:space-y-0">
            <p className="text-lime-600 dark:text-neutral-200 text-xs sm:text-base">
              The road to freedom starts from here
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
          </div>
          <div className="h-auto md:h-[30rem] py-2">
            <LayoutGrid cards={TrainCards} />
          </div>
        </div>
      </main>
    </>
  );
}
