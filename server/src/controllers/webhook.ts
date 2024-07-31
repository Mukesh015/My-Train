import { Request, Response } from 'express';
import stationData from '../../data/stationcode.json';

interface Station {
    name: string;
    code: string;
}

interface StationData {
    data: Station[];
}

function getStationCode(stationName: string, stationData: StationData): string | null {
    const station = stationData.data.find(station => station.name.toLowerCase() === stationName.toLowerCase());
    return station ? station.code : null;
}

export async function findTrains(req: Request, res: Response) {
    const intent = req.body.queryResult.intent.displayName;
    console.log("intent: " + intent);
    if (intent === 'search.train') {
        const parameters = req.body.queryResult.parameters;
        const sourceStationName = parameters.Station[0];
        const destinationStationName = parameters.Station[1];

        const sourceCode = getStationCode(sourceStationName, stationData as StationData);
        const destinationCode = getStationCode(destinationStationName, stationData as StationData);

        if (sourceCode && destinationCode) {

            res.json({
                fulfillmentText: `Looking for trains from ${sourceStationName} (${sourceCode}) to ${destinationStationName} (${destinationCode}).`
            });
        } else {
            res.json({
                fulfillmentText: `I couldn't find the station codes for ${sourceStationName} or ${destinationStationName}.`
            });
        }
    } else {
        res.json({
            fulfillmentText: `I'm sorry, I didn't understand the request.`
        });
    }
}
