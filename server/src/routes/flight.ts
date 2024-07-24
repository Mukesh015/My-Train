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
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'MAD',
      destinationLocationCode: 'ATH',
      departureDate: '2024-07-25', // Corrected date format
      adults: 1
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

module.exports = router;
export default router;