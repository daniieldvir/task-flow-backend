"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const user_1 = require("../data/user");
let nextId = 2;
const getUsers = (_req, res) => {
    res.json(user_1.users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: "Missing fields" });
    }
    const user = { id: nextId++, username, password, role };
    user_1.users.push(user);
    res.status(201).json(user);
};
exports.createUser = createUser;
