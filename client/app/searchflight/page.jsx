'use client'
import React from "react";
import SearchTable from "@/components/search-table";
import SearchAutocomplete from "@/components/search-autocomplete";
import { getAmadeusData } from "../api/amadues.api";
import axios from "axios"
import SearchCheckboxes from "@/components/search-checkbox";

// Main component 
const SearchRoot = () => {

  /* 
    With new React API we can define state in functional component like this *React.useState*
    1. first element in desctructured array - state itself
    2. second element - dispatch func, that allows us to change state
    3. we can create as many states as we need
  */
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

  /* 
    Also React has lifecycle methods. On of them is *useEffect* - the same as ComponentDidMount | ComponentDidUpdate | ComponentWillUnmount in class components 
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
              <p className="mt-2">From:</p>
              <p className="mt-2">TO:</p>
            </div>
            <div className="flex justify-around items-center">
              <SearchAutocomplete search={search} setSearch={setSearch} />

              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="mx-4">
                <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
              </svg>

              <SearchAutocomplete search={search} setSearch={setSearch} />
            </div>


          </div>
        </div>

        {/* <SearchTable dataSource={dataSource} search={search} setSearch={setSearch} loading={loading} /> */}
      </div>
    </div>
  );
};

export default SearchRoot;