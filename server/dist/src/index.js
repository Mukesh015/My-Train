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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const flight_1 = __importDefault(require("./routes/flight"));
const auth_1 = __importDefault(require("./routes/auth"));
const home_1 = __importDefault(require("./routes/home"));
const getTrains_1 = __importDefault(require("./routes/getTrains"));
const weather_1 = __importDefault(require("./routes/weather"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const client_1 = require("@prisma/client");
dotenv_1.default.config({ path: "./.env" });
exports.prisma = new client_1.PrismaClient();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT;
        if (!PORT) {
            console.error("Environment variables and PORT must be provided.");
            process.exit(1);
        }
        const app = (0, express_1.default)();
        const corsOptions = {
            origin: (origin, callback) => {
                var _a;
                const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['*'];
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: ['Content-Type', 'Authorization']
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((req, res, next) => {
            console.log('Origin:', req.headers.origin);
            next();
        });
        app.use("/flight", flight_1.default);
        app.use("/", home_1.default);
        app.use("/auth", auth_1.default);
        app.use("/trains", getTrains_1.default);
        app.use("/weather", weather_1.default);
        app.use("/webhook", webhook_1.default);
        app.use((err, req, res, next) => {
            console.error('Serverless Function:', err.message);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        });
        // Connect to the database
        try {
            yield exports.prisma.$connect();
            console.log('Connected to the database');
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1); // Exit the process with an error code
        }
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });
}
init();
//# sourceMappingURL=index.js.map