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
exports.findTrains = findTrains;
const stationcode_json_1 = __importDefault(require("../../data/stationcode.json"));
function getStationCode(stationName, stationData) {
    const station = stationData.data.find(station => station.name.toLowerCase() === stationName.toLowerCase());
    return station ? station.code : null;
}
function findTrains(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const intent = req.body.queryResult.intent.displayName;
            if (intent === 'search.train') {
                const parameters = req.body.queryResult.parameters;
                const sourceStationName = parameters.Station[0];
                const destinationStationName = parameters.Station[1];
                const sourceCode = getStationCode(sourceStationName, stationcode_json_1.default);
                const destinationCode = getStationCode(destinationStationName, stationcode_json_1.default);
                console.log(sourceCode, destinationCode);
                if (sourceCode && destinationCode) {
                    res.json({
                        fulfillmentText: `Looking for trains from ${sourceStationName} (${sourceCode}) to ${destinationStationName} (${destinationCode}).`
                    });
                }
                else {
                    res.json({
                        fulfillmentText: `I couldn't find the station codes for ${sourceStationName} or ${destinationStationName}.`
                    });
                }
            }
            else {
                res.json({
                    fulfillmentText: `I'm sorry, I didn't understand the request.`
                });
            }
        }
        catch (err) {
            res.json(err);
        }
    });
}
//# sourceMappingURL=webhook.js.map