import { Router, Request, Response } from "express";
const Amadeus = require('amadeus');
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const router: Router = Router();
const API: string = `api`;

// Amadeus client initialization
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Endpoint for airport search
router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  try {
    // API call with params we requested from client app
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": Number(page) * 10
    });
    // Sending response for client
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

// Endpoint for flight availability search
router.post(`/${API}/flightavailabilities`, async (req, res) => {
  const {sourceCode, destinationCode,selectedDate,adult,children,infants}=req.body;
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: sourceCode,
      destinationLocationCode: destinationCode,
      departureDate: selectedDate, 
      adults: adult,
      children:children,
      infants:infants
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
export default router;
