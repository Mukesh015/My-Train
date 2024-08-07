import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/flight';
import AuthRouter from './routes/auth';
import home from './routes/home';
import gettrain from './routes/getTrains';
import weatherRouter from './routes/weather';
import webHookRouter from './routes/webhook';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: "./.env" });

export const prisma = new PrismaClient();

const app = express();

const PORT: string | undefined = process.env.PORT;

if (!PORT) {
    console.error("Environment variables and PORT must be provided.");
    process.exit(1);
}

const corsOptions = {
    origin: (origin: any, callback: any) => {
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options("", cors());
app.use((req, res, next) => {
    next();
});

app.use("/flight", router);
app.use("/", home);
app.use("/auth", AuthRouter);
app.use("/trains", gettrain);
app.use("/weather", weatherRouter);
app.use("/webhook", webHookRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Serverless Function:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});

// Connect to the database
prisma.$connect()
    .then(() => {
        console.log('Connected to the database');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with an error code
    });



export default app