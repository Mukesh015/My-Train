import { Router, Request, Response } from "express";

const webHookRouter: Router = Router();
import {findTrains} from "../controllers/webhook"

webHookRouter.post("/getTrains",findTrains)

export default webHookRouter