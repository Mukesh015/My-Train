// 'use client';
// import React, { useEffect, useCallback } from "react";
// import { useState } from "react";
// import FromSearchAutocomplete from "@/components/From-search-autocomplete";
// import ToSearchAutocomplete from "@/components/To-Search-Autocomplete";
// import { getAmadeusData } from "../api/amadues.api";
// import axios from "axios";
// import { Checkbox, DatePicker, Spinner } from "@nextui-org/react";
// import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
// import { useSelector } from 'react-redux';
// import { useRouter } from "next/navigation";
// import { RootState } from "@/lib/store";
// import { Input } from "@nextui-org/input";
// import { LayoutGrid } from "@/components/ui/layout-grid";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
// import { FlightCards } from "@/components/skeleton";
// import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
// import { Counter } from "@/components/ui/counter";
// import SearchCheckboxes from "@/components/search-checkbox";

// interface SearchState {
//   keyword: string;
//   city: boolean;
//   airport: boolean;
//   page: number;
// }

// const SearchRoot: React.FC = () => {

//   const words = [
//     {
//       text: "Serach",
//       className: "text-white",
//     },
//     {
//       text: "your",
//       className: "text-white",
//     },
//     {
//       text: "flights",
//       className: "text-white",
//     },
//     {
//       text: "with",
//       className: "text-white",
//     },
//     {
//       text: "Tourism.",
//       className: "text-blue-500 dark:text-blue-500",
//     },
//   ];
//   const [showLoadingBtn, setShowLoadingBtn] = useState<boolean>(false);
//   const { adult, children, infants } = useSelector((state: RootState) => state.traveller);
//   const router = useRouter();
//   const [isTraveller, setIsTraveller] = useState(false);
//   const [search, setSearch] = useState<SearchState>({
//     keyword: "a",
//     city: true,
//     airport: true,
//     page: 0
//   });
//   const [sourceCode, setSourceCode] = useState('');
//   const [destinationCode, setDestinationCode] = useState('');
//   const [date, setDate] = useState<DateValue>(parseDate(new Date().toISOString().split('T')[0]));
//   const [defaultValue, setDefaultValue] = useState('');
//   const [dataSource, setDataSource] = useState<{ meta: { count: number }; data: any[] }>({
//     meta: { count: 0 },
//     data: []
//   });
//   const [fromValue, setFromValue] = useState<string>("");
//   const [toValue, setToValue] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   const swapValues = () => {
//     const svg = document.getElementById("toggle-svg");
//     svg?.classList.toggle("rotate-90");
//     const tempFrom = sourceCode;
//     const tempTo = destinationCode;
//     setSourceCode(tempTo);
//     setDestinationCode(tempFrom);
//     const tempFromValue = fromValue;
//     const tempToValue = toValue;
//     setFromValue(tempToValue);
//     setToValue(tempFromValue);
//     console.log("From value: " + fromValue + " to value: " + toValue)
//     setSearch((prevSearch) => ({
//       ...prevSearch,
//       keyword: "",
//       page: 0,
//     }));

//   };

//   const handleSearchFlight = useCallback(async () => {
//     setShowLoadingBtn(true);
//     router.push(`/flight/SourceCode:${sourceCode} DestinationCode:${destinationCode} selectedDate:${formatDate(date)} adult:${adult} children:${children} infants:${infants}`);
//   }, [sourceCode, destinationCode, date, adult, children, infants, router]);

//   const handleTraveller = useCallback(() => {
//     setIsTraveller(isTraveller => !isTraveller);
//   }, []);

//   const formatDate = (date: DateValue): string => {
//     const dateObj = date.toDate(getLocalTimeZone());
//     return dateObj.toLocaleDateString("en-CA");
//   };

//   useEffect(() => {
//     setDefaultValue(`Adult-${adult}, Children-${children}, Infant-${infants}`);
//   }, [adult, children, infants, defaultValue]);



//   useEffect(() => {
//     setLoading(true);

//     const { out, source } = getAmadeusData(search);

//     out.then(res => {
//       if (!res.data.code) {
//         setDataSource(res.data);
//       }
//       setLoading(false);
//     }).catch(err => {
//       axios.isCancel(err);
//       setLoading(false);
//     });

//     return () => {
//       source.cancel();
//     };
//   }, [search]);

//   return (
//     <>
//       <main className="font-Montserrat bg-[#000435] pb-[1px]">
//         <header className="ml-14"></header>
//         <div className="pt-20 sm:pt-32 px-4 sm:pl-16 flex flex-col sm:flex-row">
//           <div className="flex flex-col sm:items-start">
//             <div className="w-full sm:w-[20px] ">
//               <FromSearchAutocomplete
//                 airportCode={sourceCode}
//                 setAirportCode={setSourceCode}
//                 search={search}
//                 setSearch={setSearch}
//                 value={fromValue}
//                 setValue={setFromValue}
//               />
//             </div>

//             <button
//               onClick={() => swapValues()}
//               className="outline-rose-700 mx-auto md:ml-48 hover:bg-rose-500 outline rounded-full m-2 flex justify-center items-center"
//             >
//               <svg
//                 id="toggle-svg"
//                 className="p-1 duration-300 ease-in-out -rotate-90"
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="35px"
//                 viewBox="0 -960 960 960"
//                 width="35px"
//                 fill="#e8eaed"
//               >
//                 <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
//               </svg>
//             </button>

//             <div className="w-full sm:w-auto">
//               <ToSearchAutocomplete
//                 search={search}
//                 setSearch={setSearch}
//                 airportCode={destinationCode}
//                 setAirportCode={setDestinationCode}
//                 value={toValue}
//                 setValue={setToValue}
//               />
//             </div>

//             <Popover placement="bottom" showArrow offset={10}>
//               <PopoverTrigger>
//                 <Input
//                   type="text"
//                   label="Traveller"
//                   value={defaultValue}
//                   className="w-full max-w-[300px] sm:max-w-[250px] md:max-w-[240px] lg:max-w-[300px] xl:max-w-[350px] mt-3 sm:mt-5 text-sm sm:text-md ml-2 mb-2 sm:mb-4"
//                   onClick={handleTraveller}
//                 />  
//               </PopoverTrigger>
//               <PopoverContent className="w-[90%] sm:w-[240px]">
//                 {(titleProps) => (
//                   <div className="p-4 w-full"> {/* Changed px-1 py-2 to p-4 for more uniform padding */}
//                     <div className="flex justify-between items-center mb-4" {...titleProps}>
//                       {/* Ensures Add passengers is aligned with the rest */}
//                       <p className="text-small font-bold text-foreground inline-block">Add passengers</p>
//                     </div>
//                     <div className="text-gray-500 space-y-3">
//                       {/* Overall spacing between sections */}
//                       <div className="flex justify-between items-center">
//                         <p className="mr-4">Adult</p> {/* Added mr-4 for margin between text and counter */}
//                         <Counter value="adult" />
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <p className="mr-4">Child</p> {/* Added mr-4 for margin between text and counter */}
//                         <Counter value="children" />
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <p className="mr-4">Infant</p> {/* Added mr-4 for margin between text and counter */}
//                         <Counter value="infants" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </PopoverContent>
//             </Popover>
//             <div className="flex flex-col mt-5 ml-1">
//               <div className="flex flex-col">
//                 <div className="flex mb-1 w-full flex-wrap items-end md:flex-nowrap md:mb-0">
//                   <DatePicker
//                     value={date}
//                     onChange={setDate}
//                     className="w-full max-w-[200px] sm:max-w-[284px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]" // Responsive width classes
//                     labelPlacement="outside"
//                   />
//                 </div>
//                 <p className="text-xs sm:text-sm mt-3 ml-1 text-gray-500">
//                   Selected date: {date ? formatDate(date) : "--"}
//                 </p>
//               </div>
//             </div>

//             <div className="w-full sm:w-auto">
//               <SearchCheckboxes search={search} setSearch={setSearch} />
//             </div>

//             <button
//               onClick={() => handleSearchFlight()}
//               className="mx-auto md:ml-20 mt-6 md:mt-10 py-2 px-10 md:px-14 text-black text-base font-bold rounded-full overflow-hidden bg-rose-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
//             >
//               {showLoadingBtn ? (
//                 <section className="flex space-x-3">
//                   <span>searching</span>
//                   <Spinner color="warning" size="sm" />
//                 </section>
//               ) : (
//                 <section className="flex space-x-3">
//                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
//                   <span>Search trains</span>
//                 </section>
//               )}
//             </button>
//           </div>

//           <div className="ml-0 sm:ml-[50px] mt-10">
//             <div className="flex flex-col items-center justify-center h-[5rem]">
//               <p className="text-lime-600 dark:text-neutral-200 text-xs sm:text-base">
//                 The road to freedom starts from here
//               </p>
//               <TypewriterEffectSmooth words={words} />
//               <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
//             </div>
//             <div className="h-auto md:h-[30rem] py-2">
//               <LayoutGrid cards={FlightCards} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default SearchRoot;

"use client";

import dynamic from "next/dynamic";
import animationdata from "@/lottie/working-animation.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function FlightSearchPage() {
  const handleLinkClick = () => {
    window.open("https://github.com/Mukesh015/My-Train", "_blank");
  };

  return (
    <div className="h-screen bg-[#000435] flex flex-col items-center justify-center px-4 sm:px-28">
      <div className="pt-20 md:text-sm sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0 text-center sm:text-left">
        <p className="flex sm:flex sm:space-x-1 text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FF0000"
            className="sm:mr-2"
          >
            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
          <span>
            This page only works on a local server. If you want to see the
            functionality of this page, click on the below button and open the readme.md file to set up this project on your local server.
          </span>
        </p>
      </div>
      <div className="mt-5">
        <button onClick={()=>handleLinkClick()} className="cssbuttons-io-button">
          Lets go
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <Lottie
        className="h-[300px] sm:h-[500px] mt-8 sm:mt-0"
        animationData={animationdata}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
