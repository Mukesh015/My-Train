import { Router, Request, Response } from "express";

import axios from "axios";
const apiKey = process.env.WEATHER_API_KEY;

const weatherRouter: Router = Router();

weatherRouter.get("/weather", async (req: Request, res: Response) => {


    const city = req.query.city as string;
    const date = req.query.date as string;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}
&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const targetDate = new Date(date);
        const listData = data.list;
        const forecast = listData.find((forecast: { dt: number; }) => {
            const forecastDate = new Date(forecast.dt * 1000);
            return forecastDate.getDate() === targetDate.getDate() &&
                forecastDate.getMonth() === targetDate.getMonth() &&
                forecastDate.getFullYear() === targetDate.getFullYear();
        });

        if (forecast) {
        
            const temperature = forecast.main.temp;
            const weatherDescription = forecast.weather[0].description;
            const feelsLike=forecast.main.feels_like
            const humidity=forecast.main.humidity;


            res.status(200).send({ "Temprature": temperature, "WeatherDescription": weatherDescription ,"feelsLike":feelsLike,"humidity":humidity})
        } else {
            console.error('Forecast not found for the specified date');
            res.status(404).send({ "message": "Forecast not found" })
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send("Internal server Error")
    }
})


export default weatherRouter;