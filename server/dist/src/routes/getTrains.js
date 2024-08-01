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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var node_fetch_1 = __importDefault(require("node-fetch")); // Ensure 'node-fetch' is installed via npm
// import UserAgent from "user-agents";
var UserAgent = require("user-agents");
var prettify_1 = __importDefault(require("../utils/prettify")); // Assuming Prettify is a TypeScript file
var cheerio_1 = __importDefault(require("cheerio"));
var axios_1 = __importDefault(require("axios"));
var prettify = new prettify_1.default();
var router = (0, express_1.Router)();
router.get("/getTrain", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var trainNo, URL_Train, response, data, json, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainNo = req.query.trainNo;
                URL_Train = "https://erail.in/rail/getTrains.aspx?TrainNo=".concat(trainNo, "&DataSource=0&Language=0&Cache=true");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Train)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _a.sent();
                json = prettify.CheckTrain(data);
                resp.json(json);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                resp.send(e_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/betweenStations", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var from, to, URL_Trains, userAgent, response, data, json, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                from = req.query.from;
                to = req.query.to;
                URL_Trains = "https://erail.in/rail/getTrains.aspx?Station_From=".concat(from, "&Station_To=").concat(to, "&DataSource=0&Language=0&Cache=true");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                userAgent = new UserAgent();
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Trains, {
                        method: "GET",
                        headers: { "User-Agent": userAgent.toString() },
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _a.sent();
                json = prettify.BetweenStation(data);
                resp.json(json);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/getTrainOn", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var arr, retval, from, to, date, URL_Trains, userAgent, response, data, json, _a, DD, MM, YYYY, day_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                arr = [];
                retval = {};
                from = req.query.from;
                to = req.query.to;
                date = req.query.date;
                if (!date) {
                    retval["success"] = false;
                    retval["time_stamp"] = Date.now();
                    retval["data"] = "Please Add Specific Date";
                    resp.json(retval);
                    return [2 /*return*/];
                }
                URL_Trains = "https://erail.in/rail/getTrains.aspx?Station_From=".concat(from, "&Station_To=").concat(to, "&DataSource=0&Language=0&Cache=true");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                userAgent = new UserAgent();
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Trains, {
                        method: "GET",
                        headers: { "User-Agent": userAgent.toString() },
                    })];
            case 2:
                response = _b.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _b.sent();
                json = prettify.BetweenStation(data);
                if (!json["success"]) {
                    resp.json(json);
                    return [2 /*return*/];
                }
                _a = date.split("-"), DD = _a[0], MM = _a[1], YYYY = _a[2];
                day_1 = prettify.getDayOnDate(DD, MM, YYYY);
                json["data"].forEach(function (ele) {
                    if (ele["train_base"]["running_days"][day_1] == 1)
                        arr.push(ele);
                });
                retval["success"] = true;
                retval["time_stamp"] = Date.now();
                retval["data"] = arr;
                resp.json(retval);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/getRoute", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var trainNo, URL_Train, response, data, json, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainNo = req.query.trainNo;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                URL_Train = "https://erail.in/rail/getTrains.aspx?TrainNo=".concat(trainNo, "&DataSource=0&Language=0&Cache=true");
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Train)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _a.sent();
                json = prettify.CheckTrain(data);
                if (!json["success"]) {
                    resp.json(json);
                    return [2 /*return*/];
                }
                URL_Train = "https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=".concat(json["data"]["train_id"], "&Data2=0&Cache=true");
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Train)];
            case 4:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 5:
                data = _a.sent();
                json = prettify.GetRoute(data);
                resp.send(json);
                return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.log(err_2.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.get("/stationLive", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var code, URL_Train, response, data, $, json, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                URL_Train = "https://erail.in/station-live/".concat(code, "?DataSource=0&Language=0&Cache=true");
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Train)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _a.sent();
                $ = cheerio_1.default.load(data);
                json = prettify.LiveStation($);
                resp.send(json);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.log(err_3.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/pnrstatus", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var pnrnumber, URL_Train, response, data, json, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pnrnumber = req.query.pnr;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                URL_Train = "https://www.confirmtkt.com/pnr-status/".concat(pnrnumber);
                return [4 /*yield*/, (0, node_fetch_1.default)(URL_Train)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                data = _a.sent();
                json = prettify.PnrStatus(data);
                resp.send(json);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/gettrainname", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var trainNo, URL_Train, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainNo = req.query.trainNo;
                URL_Train = "https://indianrailapi.com/api/v2/TrainNumberToName/apikey/".concat(process.env.RAPID_API_KEY, "/TrainNumber/").concat(trainNo);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(URL_Train)];
            case 2:
                response = _a.sent();
                console.log(response.data);
                resp.json(response.data);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
