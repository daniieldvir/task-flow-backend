"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItems = void 0;
const tasks_1 = require("../data/tasks");
const alerts_1 = require("../data/alerts");
const incidents_1 = require("../data/incidents");
const collections = { tasks: tasks_1.tasks, alerts: alerts_1.alerts, incidents: incidents_1.incidents };
const nextId = { tasks: 31, alerts: 31, incidents: 31 };
const getItems = (collection) => (req, res) => {
    const { page, pageSize } = req.query;
    const data = collections[collection];
    if (page && pageSize) {
        const pageNum = parseInt(page, 10);
        const size = parseInt(pageSize, 10);
        const start = (pageNum - 1) * size;
        const pagedData = data.slice(start, start + size);
        return res.json({
            data: pagedData,
            total: data.length,
            page: pageNum,
            pageSize: size,
        });
    }
    // If no paging, return all data
    res.json(data);
};
exports.getItems = getItems;
const createItem = (collection) => (req, res) => {
    const data = req.body;
    if (!data)
        return res.status(400).json({ error: "Data required" });
    const item = { id: nextId[collection]++, ...data };
    collections[collection].push(item);
    res.status(201).json(item);
};
exports.createItem = createItem;
const updateItem = (collection) => (req, res) => {
    const { id } = req.params;
    const item = collections[collection].find(i => i.id === Number(id));
    if (!item)
        return res.status(404).json({ error: `${collection.slice(0, -1)} not found` });
    Object.assign(item, req.body);
    res.json(item);
};
exports.updateItem = updateItem;
const deleteItem = (collection) => (req, res) => {
    const { id } = req.params;
    const index = collections[collection].findIndex(i => i.id === Number(id));
    if (index === -1)
        return res.status(404).json({ error: `${collection.slice(0, -1)} not found` });
    const deleted = collections[collection].splice(index, 1);
    res.json(deleted[0]);
};
exports.deleteItem = deleteItem;
