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

export const getAmadeusData = (params: GetAmadeusDataParams): GetAmadeusDataReturn => {
  // Destructuring params
  const { keyword = "", page = 0, city = true, airport = true } = params;

  // Checking for proper subType 
  const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";

  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  const searchQuery = keyword ? keyword : "a";

  // This is extra tool for cancellation request, to avoid overload API 
  const source = CancelToken.source();

  // GET request with all params we need
  const out = axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
    {
      cancelToken: source.token
    }
  );

  return { out, source };
};
