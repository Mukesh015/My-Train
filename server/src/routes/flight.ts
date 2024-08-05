import { Router, Request, Response } from "express";
const Amadeus = require('amadeus');
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const router: Router = Router();
const API: string = `api`;


const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});


router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  try {
 
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": Number(page) * 10
    });
  
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});


router.get(`/${API}/flightavailabilities`, async (req, res) => {
  const {sourceCode,destinationCode,selectedDate,adults,children,infants} = req.query;
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: sourceCode,
      destinationLocationCode: destinationCode,
      departureDate: selectedDate,
      adults: adults,
      children:children,
      infants:infants
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

module.exports = router;
export default router;