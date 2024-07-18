import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: "./.env" });
import router from "./routes/flight"
async function init() {

    const PORT: string | undefined = process.env.PORT;

    if ( !PORT) {
        console.error("Environment variables and PORT must be provided.");
        return;
    }

    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/",router)

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
}

init();