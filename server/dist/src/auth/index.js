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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.savedToSearchHistory = savedToSearchHistory;
exports.savedSearchTrainHistory = savedSearchTrainHistory;
exports.getUserHistory = getUserHistory;
var index_1 = require("../index");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, username, id, isUserExist, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, username = _a.username, id = _a.id;
                    if (!email || !username || !id) {
                        return [2 /*return*/, res.status(400).json({ status: 0, message: "Missing required fields" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, index_1.prisma.user.findUnique({
                            where: { id: id }
                        })];
                case 2:
                    isUserExist = _b.sent();
                    if (isUserExist) {
                        return [2 /*return*/, res.status(400).json({ status: 0, message: "user already exists" })];
                    }
                    return [4 /*yield*/, index_1.prisma.user.create({
                            data: {
                                id: id,
                                email: email,
                                name: username
                            },
                        })];
                case 3:
                    user = _b.sent();
                    console.log(user);
                    if (user) {
                        console.log("Signup successful");
                        return [2 /*return*/, res.status(201).json({ status: 1, message: "user created successfully" })];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error signing up", error_1);
                    return [2 /*return*/, res.status(500).json({ error: error_1 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function savedToSearchHistory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, from, to, user, savedSearchHistory, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, from = _a.from, to = _a.to;
                    // Validate required fields
                    if (!id || !from || !to) {
                        return [2 /*return*/, res.status(400).json({ status: 0, message: "Missing required fields" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, index_1.prisma.user.findUnique({
                            where: { id: id },
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ status: 0, message: "User not found" })];
                    }
                    return [4 /*yield*/, index_1.prisma.searchHistory.create({
                            data: {
                                userId: id,
                                from: from,
                                to: to,
                            },
                        })];
                case 3:
                    savedSearchHistory = _b.sent();
                    if (savedSearchHistory) {
                        return [2 /*return*/, res.status(201).json({ status: 1, message: "Saved to history successfully" })];
                    }
                    else {
                        return [2 /*return*/, res.status(500).json({ status: 0, message: "Failed to save to history" })];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error saving to history", error_2);
                    return [2 /*return*/, res.status(500).json({ status: 0, message: "Internal server error", error: error_2 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function savedSearchTrainHistory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, train_name, train_no, user, savedRecentTrainSearch, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, train_name = _a.train_name, train_no = _a.train_no;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    if (!id || !train_name || !train_no) {
                        return [2 /*return*/, res.status(400).json({ status: 0, message: "Missing required fields" })];
                    }
                    return [4 /*yield*/, index_1.prisma.user.findUnique({
                            where: { id: id },
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ status: 0, message: "User not found" })];
                    }
                    return [4 /*yield*/, index_1.prisma.recentSearchtrains.create({
                            data: {
                                userId: id,
                                trainNo: train_no,
                                trainName: train_name,
                            },
                        })];
                case 3:
                    savedRecentTrainSearch = _b.sent();
                    if (savedRecentTrainSearch) {
                        return [2 /*return*/, res.status(201).json({ status: 1, message: "Saved to train search history successfully" })];
                    }
                    else {
                        return [2 /*return*/, res.status(500).json({ status: 0, message: "Failed to save to train search history" })];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    console.error("Error saving to history", error_3);
                    return [2 /*return*/, res.status(500).json({ status: 0, message: "Internal server error", error: error_3 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserHistory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, recentTrains, searchHistory, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    // Validate ID presence
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ status: 0, message: "User ID is required" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, index_1.prisma.user.findUnique({
                            where: { id: id },
                        })];
                case 2:
                    user = _a.sent();
                    // If user doesn't exist, return 404
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ status: 0, message: "User not found" })];
                    }
                    return [4 /*yield*/, index_1.prisma.recentSearchtrains.findMany({
                            where: { userId: id },
                            orderBy: { date: 'desc' }, // Optional: Order by most recent
                            select: {
                                trainNo: true,
                                trainName: true,
                                date: true,
                            },
                        })];
                case 3:
                    recentTrains = _a.sent();
                    return [4 /*yield*/, index_1.prisma.searchHistory.findMany({
                            where: { userId: id },
                            orderBy: { date: 'desc' }, // Optional: Order by most recent
                            select: {
                                from: true,
                                to: true,
                                date: true,
                            },
                        })];
                case 4:
                    searchHistory = _a.sent();
                    // Combine the results into a single response
                    return [2 /*return*/, res.status(200).json({
                            status: 1,
                            message: "User history retrieved successfully",
                            data: {
                                recentTrains: recentTrains,
                                searchHistory: searchHistory,
                            },
                        })];
                case 5:
                    error_4 = _a.sent();
                    console.error("Error retrieving user history", error_4);
                    return [2 /*return*/, res.status(500).json({ status: 0, message: "Internal server error", error: error_4 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
