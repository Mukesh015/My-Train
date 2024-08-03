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
const node_fetch_1 = __importDefault(require("node-fetch")); // Ensure 'node-fetch' is installed via npm
// import UserAgent from "user-agents";
const UserAgent = require("user-agents");
const prettify_1 = __importDefault(require("../utils/prettify")); // Assuming Prettify is a TypeScript file
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const prettify = new prettify_1.default();
const router = (0, express_1.Router)();
router.get("/getTrain", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const trainNo = req.query.trainNo;
    const URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    try {
        const response = yield (0, node_fetch_1.default)(URL_Train);
        const data = yield response.text();
        const json = prettify.CheckTrain(data);
        resp.json(json);
    }
    catch (e) {
        resp.send(e.message);
    }
}));
router.get("/betweenStations", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const from = req.query.from;
    const to = req.query.to;
    const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try {
        const userAgent = new UserAgent();
        const response = yield (0, node_fetch_1.default)(URL_Trains, {
            method: "GET",
            headers: { "User-Agent": userAgent.toString() },
        });
        const data = yield response.text();
        const json = prettify.BetweenStation(data);
        resp.json(json);
    }
    catch (error) {
        console.log(error.message);
    }
}));
router.get("/getTrainOn", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = [];
    const retval = {};
    const from = req.query.from;
    const to = req.query.to;
    const date = req.query.date;
    if (!date) {
        retval["success"] = false;
        retval["time_stamp"] = Date.now();
        retval["data"] = "Please Add Specific Date";
        resp.json(retval);
        return;
    }
    const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try {
        const userAgent = new UserAgent();
        const response = yield (0, node_fetch_1.default)(URL_Trains, {
            method: "GET",
            headers: { "User-Agent": userAgent.toString() },
        });
        const data = yield response.text();
        const json = prettify.BetweenStation(data);
        if (!json["success"]) {
            resp.json(json);
            return;
        }
        const [DD, MM, YYYY] = date.split("-");
        const day = prettify.getDayOnDate(DD, MM, YYYY);
        json["data"].forEach((ele) => {
            if (ele["train_base"]["running_days"][day] == 1)
                arr.push(ele);
        });
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        resp.json(retval);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/getRoute", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const trainNo = req.query.trainNo;
    try {
        let URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
        let response = yield (0, node_fetch_1.default)(URL_Train);
        let data = yield response.text();
        let json = prettify.CheckTrain(data);
        if (!json["success"]) {
            resp.json(json);
            return;
        }
        URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json["data"]["train_id"]}&Data2=0&Cache=true`;
        response = yield (0, node_fetch_1.default)(URL_Train);
        data = yield response.text();
        json = prettify.GetRoute(data);
        resp.send(json);
    }
    catch (err) {
        console.log(err.message);
    }
}));
router.get("/stationLive", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        let URL_Train = `https://erail.in/station-live/${code}?DataSource=0&Language=0&Cache=true`;
        let response = yield (0, node_fetch_1.default)(URL_Train);
        let data = yield response.text();
        const $ = cheerio_1.default.load(data);
        let json = prettify.LiveStation($);
        resp.send(json);
    }
    catch (err) {
        console.log(err.message);
    }
}));
router.get("/pnrstatus", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const pnrnumber = req.query.pnr;
    try {
        let URL_Train = `https://www.confirmtkt.com/pnr-status/${pnrnumber}`;
        let response = yield (0, node_fetch_1.default)(URL_Train);
        let data = yield response.text();
        let json = prettify.PnrStatus(data);
        resp.send(json);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/gettrainname", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const trainNo = req.query.trainNo;
    const URL_Train = `https://indianrailapi.com/api/v2/TrainNumberToName/apikey/${process.env.RAPID_API_KEY}/TrainNumber/${trainNo}`;
    try {
        const response = yield axios_1.default.get(URL_Train);
        console.log(response.data);
        resp.json(response.data);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=getTrains.js.map