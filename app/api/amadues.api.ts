import axios, { AxiosResponse, CancelTokenSource } from "axios";

const CancelToken = axios.CancelToken;

interface GetAmadeusDataParams {
  keyword?: string;
  page?: number;
  city?: boolean;
  airport?: boolean;
}


interface GetAmadeusDataReturn {
  out: Promise<AxiosResponse<any>>;
  source: CancelTokenSource;
}


interface getFlightstod {
  sourceCode?: string;
  destinationCode?: string;
  selectedDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
}

export const getAmadeusData = (params: GetAmadeusDataParams): GetAmadeusDataReturn => {

  const { keyword = "", page = 0, city = true, airport = true } = params;


  const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";


  const searchQuery = keyword ? keyword : "a";


  const source = CancelToken.source();


  const out = axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/flight/api/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
    {
      cancelToken: source.token
    }
  );

  return { out, source };
};


export const getFlightstod = (params: getFlightstod): GetAmadeusDataReturn => {

  const { sourceCode, destinationCode, selectedDate, adults, children, infants } = params;



  const source = CancelToken.source();


  const out = axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/flight/api/flightavailabilities/?sourceCode=${sourceCode}&destinationCode=${destinationCode}&selectedDate=${selectedDate}&adults=${adults}&children=${children}&infants=${infants}`,
    {
      cancelToken: source.token
    }
  );

  return { out, source };

}