"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import stationData from "@/data/stationcode.json";
import { TrainCards } from "@/components/skeleton"
import NextTopLoader from 'nextjs-toploader';

// Station interfaces
interface Station {
  name: string;
  code: string;
}

interface StationData {
  data: Station[];
}

export default function TrainPage() {

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
      text: "trains",
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

  const router = useRouter();
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

  const handleSearchTrain = () => {
    router.push(`/trainresult/alltrains/search?from=${fromStation}&to=${toStation}&date=${date}`);
  };

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
      <main className="font-Montserrat bg-[#000435] pb-[1px]">
        <div className="pt-32 pl-12 flex">
          <div>
            <div className="flex w-[450px] flex-col justify-center items-center px-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 relative">
                <Input
                  value={inputValue}
                  onChange={handleFromInputChange}
                  type="text"
                  variant="flat"
                  label="From Station"
                  autoComplete="off"
                />
                {fromSuggestions.length > 0 && (
                  <ul className="w-[400px] absolute mt-16 z-50 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
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
            <button onClick={() => handleToggleStations()} className="outline-rose-700 ml-52 hover:bg-rose-500 outline rounded-full m-3">
              <svg
                className="hover:-rotate-90 p-3 duration-700 ease-in-out rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                height="45px"
                viewBox="0 -960 960 960"
                width="45px"
                fill="#e8eaed"
              >
                <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
              </svg>
            </button>
            <div className="flex w-[450px] flex-col justify-center items-center px-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 relative">
                <Input
                  value={toInputValue}
                  onChange={handleToInputChange}
                  type="text"
                  variant="flat"
                  label="To Station"
                  autoComplete="off"
                />
                {toSuggestions.length > 0 && (
                  <ul className="w-[400px] absolute mt-[4rem] z-50 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
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
            <div className="flex flex-col ml-5">
              <div className="flex flex-col">
                <div className="mt-2 w-full items-end md:flex-nowrap md:mb-0">
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    label={"Train date"}
                    className="max-w-[284px]"
                    labelPlacement="outside"
                  />
                  <p className="text-sm ml-3 mt-2 text-gray-500">
                    Selected date: {date ? formatter.format(date.toDate(getLocalTimeZone())) : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 ml-5 space-y-3">
              <p>
                <span>
                  <Checkbox
                    onClick={() => handleDisabilityCheckBox()}
                    isSelected={disabilityCheckBox}
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>Person with disability concession</span>
              </p>
              <p>
                <span>
                  <Checkbox
                    onClick={() => handleDateFlexibleCheckBox()}
                    isSelected={dateFlexibleCheckBox}
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>Flexible with date</span>
              </p>
              <p>
                <span>
                  <Checkbox
                    onClick={() => handleBerthAvailabilityCheckBox()}
                    isSelected={berthAvailabilityCheckBox}
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>train with available berth</span>
              </p>
              <p>
                <span>
                  <Checkbox
                    onClick={() => handleConcessionCheckBox()}
                    isSelected={concesssionCheckBox}
                    className="text-rose-500"
                    defaultSelected
                    color="warning"
                  ></Checkbox>
                </span>
                <span>railway path concession</span>
              </p>
            </div>
            <button
              onClick={() => handleSearchTrain()}
              className="ml-20 mt-10 py-2 px-14 text-black text-base font-bold nded-full overflow-hidden bg-rose-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Search trains
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
              <LayoutGrid cards={TrainCards} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
