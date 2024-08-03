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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.savedToSearchHistory = savedToSearchHistory;
exports.savedSearchTrainHistory = savedSearchTrainHistory;
exports.getUserHistory = getUserHistory;
const index_1 = require("../index");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, id } = req.body;
        if (!email || !username || !id) {
            return res.status(400).json({ status: 0, message: "Missing required fields" });
        }
        try {
            const isUserExist = yield index_1.prisma.user.findUnique({
                where: { id: id }
            });
            if (isUserExist) {
                return res.status(400).json({ status: 0, message: "user already exists" });
            }
            const user = yield index_1.prisma.user.create({
                data: {
                    id: id,
                    email: email,
                    name: username
                },
            });
            console.log(user);
            if (user) {
                console.log("Signup successful");
                return res.status(201).json({ status: 1, message: "user created successfully" });
            }
        }
        catch (error) {
            console.error("Error signing up", error);
            return res.status(500).json({ error: error });
        }
    });
}
function savedToSearchHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, from, to } = req.body;
        // Validate required fields
        if (!id || !from || !to) {
            return res.status(400).json({ status: 0, message: "Missing required fields" });
        }
        try {
            // Check if user exists
            const user = yield index_1.prisma.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                return res.status(404).json({ status: 0, message: "User not found" });
            }
            // Optionally save to SearchHistory
            const savedSearchHistory = yield index_1.prisma.searchHistory.create({
                data: {
                    userId: id,
                    from: from,
                    to: to,
                },
            });
            if (savedSearchHistory) {
                return res.status(201).json({ status: 1, message: "Saved to history successfully" });
            }
            else {
                return res.status(500).json({ status: 0, message: "Failed to save to history" });
            }
        }
        catch (error) {
            console.error("Error saving to history", error);
            return res.status(500).json({ status: 0, message: "Internal server error", error: error });
        }
    });
}
function savedSearchTrainHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, train_name, train_no } = req.body;
        try {
            if (!id || !train_name || !train_no) {
                return res.status(400).json({ status: 0, message: "Missing required fields" });
            }
            const user = yield index_1.prisma.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                return res.status(404).json({ status: 0, message: "User not found" });
            }
            const savedRecentTrainSearch = yield index_1.prisma.recentSearchtrains.create({
                data: {
                    userId: id,
                    trainNo: train_no,
                    trainName: train_name,
                },
            });
            if (savedRecentTrainSearch) {
                return res.status(201).json({ status: 1, message: "Saved to train search history successfully" });
            }
            else {
                return res.status(500).json({ status: 0, message: "Failed to save to train search history" });
            }
        }
        catch (error) {
            console.error("Error saving to history", error);
            return res.status(500).json({ status: 0, message: "Internal server error", error: error });
        }
    });
}
function getUserHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params; // Assuming ID is provided as a URL parameter
        // Validate ID presence
        if (!id) {
            return res.status(400).json({ status: 0, message: "User ID is required" });
        }
        try {
            // Find user by ID
            const user = yield index_1.prisma.user.findUnique({
                where: { id: id },
            });
            // If user doesn't exist, return 404
            if (!user) {
                return res.status(404).json({ status: 0, message: "User not found" });
            }
            // Retrieve recent train searches for the user
            const recentTrains = yield index_1.prisma.recentSearchtrains.findMany({
                where: { userId: id },
                orderBy: { date: 'desc' }, // Optional: Order by most recent
                select: {
                    trainNo: true,
                    trainName: true,
                    date: true,
                },
            });
            // Retrieve search history for the user
            const searchHistory = yield index_1.prisma.searchHistory.findMany({
                where: { userId: id },
                orderBy: { date: 'desc' }, // Optional: Order by most recent
                select: {
                    from: true,
                    to: true,
                    date: true,
                },
            });
            // Combine the results into a single response
            return res.status(200).json({
                status: 1,
                message: "User history retrieved successfully",
                data: {
                    recentTrains,
                    searchHistory,
                },
            });
        }
        catch (error) {
            console.error("Error retrieving user history", error);
            return res.status(500).json({ status: 0, message: "Internal server error", error: error });
        }
    });
}
//# sourceMappingURL=index.js.map