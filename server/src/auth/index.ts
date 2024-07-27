import { prisma } from "../api";
import { Request, Response } from 'express';

export async function signup(req: Request, res: Response) {
    const { email, username, id } = req.body;
    try {
        const isUserExist = await prisma.user.findUnique({
            where: { email: email }
        })
        if (isUserExist) {
            return res.status(400).json({ status: 0, message: "user already exists" })
        }
        const user = await prisma.user.create({
            data: {
                id: id,
                email: email,
                name: username,
            },
        });
        console.log(user);
        if (user) {
            console.log("Signup successful");
            return res.status(201).json({ status: 1, message: "user created successfully" });
        }

    } catch (error) {
        console.error("Error signing up");
        return res.status(500).json({ error: error });
    }
}