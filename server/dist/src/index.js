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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var flight_1 = __importDefault(require("./routes/flight"));
var auth_1 = __importDefault(require("./routes/auth"));
var home_1 = __importDefault(require("./routes/home"));
var getTrains_1 = __importDefault(require("./routes/getTrains"));
var weather_1 = __importDefault(require("./routes/weather"));
var webhook_1 = __importDefault(require("./routes/webhook"));
var client_1 = require("@prisma/client");
dotenv_1.default.config({ path: "./.env" });
exports.prisma = new client_1.PrismaClient();
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var PORT, app, corsOptions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PORT = process.env.PORT;
                    if (!PORT) {
                        console.error("Environment variables and PORT must be provided.");
                        process.exit(1); // Exit the process with an error code
                    }
                    app = (0, express_1.default)();
                    corsOptions = {
                        origin: function (origin, callback) {
                            var _a;
                            var allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['*'];
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
                    app.use(function (req, res, next) {
                        console.log('Origin:', req.headers.origin);
                        next();
                    });
                    app.use("/flight", flight_1.default);
                    app.use("/", home_1.default);
                    app.use("/auth", auth_1.default);
                    app.use("/trains", getTrains_1.default);
                    app.use("/weather", weather_1.default);
                    app.use("/webhook", webhook_1.default);
                    // Global error handler
                    app.use(function (err, req, res, next) {
                        console.error('Unhandled Error:', err.message);
                        res.status(500).json({
                            success: false,
                            message: 'Internal Server Error',
                        });
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exports.prisma.$connect()];
                case 2:
                    _a.sent();
                    console.log('Connected to the database');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error connecting to the database:', error_1);
                    process.exit(1); // Exit the process with an error code
                    return [3 /*break*/, 4];
                case 4:
                    // Start the server
                    app.listen(PORT, function () {
                        console.log("Server is running on http://localhost:".concat(PORT));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
init();
