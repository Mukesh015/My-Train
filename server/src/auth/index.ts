import { prisma } from "../index";
import { Request, Response } from 'express';

export async function signup(req: Request, res: Response) {
    const { email, username, id } = req.body;
    if (!email || !username || !id) {
        return res.status(400).json({ status: 0, message: "Missing required fields" });
    }
    try {
        const isUserExist = await prisma.user.findUnique({
            where: { id: id }
        })
        if (isUserExist) {
            return res.status(400).json({ status: 0, message: "user already exists" })
        }
        const user = await prisma.user.create({
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

    } catch (error) {
        console.error("Error signing up", error);
        return res.status(500).json({ error: error });
    }
}


export async function savedToSearchHistory(req: Request, res: Response) {
    const { id, from, to } = req.body;

    // Validate required fields
    if (!id || !from || !to) {
        return res.status(400).json({ status: 0, message: "Missing required fields" });
    }

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }
        // Optionally save to SearchHistory
        const savedSearchHistory = await prisma.searchHistory.create({
            data: {
                userId: id,
                from: from,
                to: to,
            },
        });

        if (savedSearchHistory) {
            return res.status(201).json({ status: 1, message: "Saved to history successfully" });
        } else {
            return res.status(500).json({ status: 0, message: "Failed to save to history" });
        }
    } catch (error) {
        console.error("Error saving to history", error);
        return res.status(500).json({ status: 0, message: "Internal server error", error: error });
    }
}

export async function savedSearchTrainHistory(req: Request, res: Response) {
    const { id, train_name, train_no } = req.body;

    try {
        if (!id || !train_name || !train_no) {
            return res.status(400).json({ status: 0, message: "Missing required fields" });
        }

        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }

        const savedRecentTrainSearch = await prisma.recentSearchtrains.create({
            data: {
                userId: id,
                trainNo: train_no,
                trainName: train_name,
            },
        });

        if (savedRecentTrainSearch) {
            return res.status(201).json({ status: 1, message: "Saved to train search history successfully" });
        } else {
            return res.status(500).json({ status: 0, message: "Failed to save to train search history" });
        }
    } catch (error) {
        console.error("Error saving to history", error);
        return res.status(500).json({ status: 0, message: "Internal server error", error: error });
    }
}

export async function getUserHistory(req: Request, res: Response) {
    const { id } = req.params; // Assuming ID is provided as a URL parameter

    // Validate ID presence
    if (!id) {
        return res.status(400).json({ status: 0, message: "User ID is required" });
    }

    try {
        // Find user by ID
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        // If user doesn't exist, return 404
        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found" });
        }

        // Retrieve recent train searches for the user
        const recentTrains = await prisma.recentSearchtrains.findMany({
            where: { userId: id },
            orderBy: { date: 'desc' }, // Optional: Order by most recent
            select: {
                trainNo: true,
                trainName: true,
                date: true,
            },
        });

        // Retrieve search history for the user
        const searchHistory = await prisma.searchHistory.findMany({
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
    } catch (error) {
        console.error("Error retrieving user history", error);
        return res.status(500).json({ status: 0, message: "Internal server error", error: error });
    }
}