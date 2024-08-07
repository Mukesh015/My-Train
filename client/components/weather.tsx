import { useLocation } from "@/lib/cityprovider";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import sunny from "../lottie/Animation - 1722963756766.json";
import cloudy from "../lottie/Animation - 1722963832258.json";
import heatwave from "../lottie/Animation - 1722964137404.json";
import thunder from "../lottie/Animation - 1722964227245.json";

interface WeatherData {
    Temprature: number;
    WeatherDescription: string;
    feelsLike: number;
    humidity: number;
}

interface Props {
    date: string;
}

const WeatherDetails: React.FC<Props> = ({ date }) => {
    const { source, destination } = useLocation();
    const [sourceWeatherData, setSourceWeatherData] = useState<WeatherData | null>(null);
    const [destinationWeatherData, setDestinationWeatherData] = useState<WeatherData | null>(null);

    function getCityName(locationString: string): string {
        const parenthesisIndex = locationString.indexOf("(");
        if (parenthesisIndex === -1) {
            return locationString.toLowerCase();
        }
        const cityName = locationString.substring(0, parenthesisIndex).trim();
        return cityName.toLowerCase();
    }

    const handleFetchWeatherOfSourceCity = useCallback(
        async (sourceCity: string) => {
            try {
                const response = await fetch(
                    `https://my-tour-api.vercel.app/weather/weather/?city=${sourceCity}&date=${date}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setSourceWeatherData(data);
                } else {
                    console.error("Server responded with a bad response");
                    console.log(response);
                }
            } catch (e) {
                console.error("Fetch failed for source city", e);
            }
        },
        [setSourceWeatherData]
    );

    const handleFetchWeatherOfDestinationCity = useCallback(
        async (destinationCity: string) => {
            try {
                const response = await fetch(
                    `https://my-tour-api.vercel.app/weather/weather/?city=${destinationCity}&date=${date}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setDestinationWeatherData(data);
                } else {
                    console.error("Server responded with a bad response");
                    console.log(response);
                }
            } catch (e) {
                console.error("Fetch failed for destination city", e);
            }
        },
        [setDestinationWeatherData]
    );

    useEffect(() => {
        const sourceCity = getCityName(source);
        const destinationCity = getCityName(destination);
        if (sourceCity) {
            handleFetchWeatherOfSourceCity(sourceCity);
        }
        if (destinationCity) {
            handleFetchWeatherOfDestinationCity(destinationCity);
        }
    }, [handleFetchWeatherOfDestinationCity, handleFetchWeatherOfSourceCity]);

    // Function to select the appropriate weather animation based on the weather description.
    const getWeatherAnimation = (weatherDescription: string) => {
        switch (weatherDescription.toLowerCase()) {
            case "clear":
                return sunny;
            case "cloudy":
                return cloudy;
            case "heatwave":
                return heatwave;
            case "thunderstorm":
                return thunder;
            default:
                return cloudy;
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <section className="flex items-center space-x-2">
                    {sourceWeatherData && (
                        <>
                            <Lottie
                                className="h-10"
                                animationData={getWeatherAnimation(sourceWeatherData.WeatherDescription)}
                            />
                            <p className="flex items-center space-x-3">
                                <span className="flex items-center">
                                    <span>{sourceWeatherData.Temprature}</span>
                                    <svg
                                        className="mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="10px"
                                        viewBox="0 -960 960 960"
                                        width="10px"
                                        fill="#e8eaed"
                                    >
                                        <path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
                                    </svg>
                                    <span>C</span>
                                    <span className="ml-2">at {getCityName(source)}</span>
                                </span>
                                <span className="border w-0 h-4"></span>
                                <span className="ml-3 flex items-center">
                                    <span>Real feel</span>
                                    <span className="border h-0 w-3 ml-2 flex"></span>
                                    <span className="ml-2">{sourceWeatherData.feelsLike}</span>
                                    <svg
                                        className="mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="10px"
                                        viewBox="0 -960 960 960"
                                        width="10px"
                                        fill="#e8eaed"
                                    >
                                        <path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
                                    </svg>
                                    <span>C</span>
                                </span>
                                <span className="border w-0 h-4"></span>
                                <span className="flex items-center ml-3">
                                    <span>Humidity</span>
                                    <span className="border h-0 w-3 ml-2 flex"></span>
                                    <span className="ml-2">{sourceWeatherData.humidity} %</span>
                                </span>
                            </p>
                        </>
                    )}
                </section>
                <section className="flex items-center space-x-2">
                    {destinationWeatherData && (
                        <>
                            <Lottie
                                className="h-10"
                                animationData={getWeatherAnimation(destinationWeatherData.WeatherDescription)}
                            />
                            <p className="flex items-center space-x-3">
                                <span className="flex items-center">
                                    <span>{destinationWeatherData.Temprature}</span>
                                    <svg
                                        className="mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="10px"
                                        viewBox="0 -960 960 960"
                                        width="10px"
                                        fill="#e8eaed"
                                    >
                                        <path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
                                    </svg>
                                    <span>C</span>
                                    <span className="ml-2">at {getCityName(destination)}</span>
                                </span>
                                <span className="border w-0 h-4"></span>
                                <span className="ml-3 flex items-center">
                                    <span>Real feel</span>
                                    <span className="border h-0 w-3 ml-2 flex"></span>
                                    <span className="ml-2">{destinationWeatherData.feelsLike}</span>
                                    <svg
                                        className="mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="10px"
                                        viewBox="0 -960 960 960"
                                        width="10px"
                                        fill="#e8eaed"
                                    >
                                        <path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
                                    </svg>
                                    <span>C</span>
                                </span>
                                <span className="border w-0 h-4"></span>
                                <span className="flex items-center ml-3">
                                    <span>Humidity</span>
                                    <span className="border h-0 w-3 ml-2 flex"></span>
                                    <span className="ml-2">{destinationWeatherData.humidity} %</span>
                                </span>
                            </p>
                        </>
                    )}
                </section>
            </div>
        </>
    );
};

export default WeatherDetails;
