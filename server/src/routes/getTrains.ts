import { Router, Request, Response } from "express";
import fetch from "node-fetch"; // Ensure 'node-fetch' is installed via npm
// import UserAgent from "user-agents";
const UserAgent = require("user-agents")
import Prettify from "../utils/prettify"; // Assuming Prettify is a TypeScript file
import cheerio from 'cheerio';

const prettify = new Prettify();
const router = Router();

router.get("/getTrain", async (req: Request, resp: Response) => {
  const trainNo = req.query.trainNo as string;
  const URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
  try {
    const response = await fetch(URL_Train);
    const data = await response.text();
    const json = prettify.CheckTrain(data);
    resp.json(json);
  } catch (e: any) {
    resp.send(e.message);
  }
});

router.get("/betweenStations", async (req: Request, resp: Response) => {
  const from = req.query.from as string;
  const to = req.query.to as string;
  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
  try {
    const userAgent = new UserAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    const data = await response.text();
    const json = prettify.BetweenStation(data);
    resp.json(json);
  } catch (error: any) {
    console.log(error.message);
  }
});

router.get("/getTrainOn", async (req: Request, resp: Response) => {
  const arr: any[] = [];
  const retval: any = {};
  const from = req.query.from as string;
  const to = req.query.to as string;
  const date = req.query.date as string;
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
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    const data = await response.text();
    const json = prettify.BetweenStation(data);
    if (!json["success"]) {
      resp.json(json);
      return;
    }
    const [DD, MM, YYYY] = date.split("-");
    const day = prettify.getDayOnDate(DD, MM, YYYY);
    json["data"].forEach((ele: any) => {
      if (ele["train_base"]["running_days"][day] == 1) arr.push(ele);
    });
    retval["success"] = true;
    retval["time_stamp"] = Date.now();
    retval["data"] = arr;
    resp.json(retval);
  } catch (err: any) {
    console.log(err);
  }
});

router.get("/getRoute", async (req: Request, resp: Response) => {
  const trainNo = req.query.trainNo as string;
  try {
    let URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    let response = await fetch(URL_Train);
    let data = await response.text();
    let json = prettify.CheckTrain(data);
    if (!json["success"]) {
      resp.json(json);
      return;
    }
    URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json["data"]["train_id"]}&Data2=0&Cache=true`;
    response = await fetch(URL_Train);
    data = await response.text();
    json = prettify.GetRoute(data);
    resp.send(json);
  } catch (err: any) {
    console.log(err.message);
  }
});

router.get("/stationLive", async (req: Request, resp: Response) => {
  const code = req.query.code as string;
  try {
    let URL_Train = `https://erail.in/station-live/${code}?DataSource=0&Language=0&Cache=true`;
    let response = await fetch(URL_Train);
    let data = await response.text();
    const $ = cheerio.load(data);
    let json = prettify.LiveStation($);
    resp.send(json);
  } catch (err: any) {
    console.log(err.message);
  }
});

router.get("/pnrstatus", async (req: Request, resp: Response) => {
  const pnrnumber = req.query.pnr as string;
  try {
    let URL_Train = `https://www.confirmtkt.com/pnr-status/${pnrnumber}`;
    let response = await fetch(URL_Train);
    let data = await response.text();
    let json = prettify.PnrStatus(data);
    resp.send(json);
  } catch (error: any) {
    console.log(error);
  }
});

export default router;
