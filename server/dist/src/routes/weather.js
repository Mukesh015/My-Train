"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.WEATHER_API_KEY;
const weatherRouter = (0, express_1.Router)();
weatherRouter.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.query.city;
    const date = req.query.date;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}
&units=metric`;
    try {
        const response = yield axios_1.default.get(apiUrl);
        const data = response.data;
        const targetDate = new Date(date);
        const listData = data.list;
        const forecast = listData.find((forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            return forecastDate.getDate() === targetDate.getDate() &&
                forecastDate.getMonth() === targetDate.getMonth() &&
                forecastDate.getFullYear() === targetDate.getFullYear();
        });
        if (forecast) {
            const temperature = forecast.main.temp;
            const weatherDescription = forecast.weather[0].description;
            const feelsLike = forecast.main.feels_like;
            const humidity = forecast.main.humidity;
            res.status(200).send({ "Temprature": temperature, "WeatherDescription": weatherDescription, "feelsLike": feelsLike, "humidity": humidity });
        }
        else {
            console.error('Forecast not found for the specified date');
            res.status(404).send({ "message": "Forecast not found" });
        }
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send("Internal server Error");
    }
}));
exports.default = weatherRouter;
//# sourceMappingURL=weather.js.map