import { Request, Response } from "express";
import { users, User } from "../data/user";

let nextId = 2;

export const getUsers = (_req: Request, res: Response) => {
    res.json(users);
};

export const createUser = (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const user: User = { id: nextId++, username, password, };
    users.push(user);
    res.status(201).json(user);
};
