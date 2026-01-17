import { Request, Response } from 'express';
import { tasks, Task } from '../data/tasks';
import { alerts, Alert } from '../data/alerts';
import { incidents, Incident } from '../data/incidents';

type Collection = "tasks" | "alerts" | "incidents";

const collections: Record<Collection, any[]> = { tasks, alerts, incidents };
const nextId: Record<Collection, number> = { tasks: 31, alerts: 31, incidents: 31 };

export const getItems = (collection: Collection) => (req: Request, res: Response) => {
    const { page, pageSize } = req.query;
  
    const data = collections[collection];
  
    if (page && pageSize) {
      const pageNum = parseInt(page as string, 10);
      const size = parseInt(pageSize as string, 10);
  
      const start = (pageNum - 1) * size;
      const pagedData = data.slice(start, start + size);
  
      return res.json({
        data: pagedData,
        total: data.length,
        page: pageNum,
        pageSize: size,
      });
    }
  
    res.json(data);
  };

export const createItem = (collection: Collection) => (req: Request, res: Response) => {
  const data = req.body;
  if (!data) return res.status(400).json({ error: "Data required" });

  const item = { id: nextId[collection]++, ...data };
  collections[collection].push(item);
  res.status(201).json(item);
};

export const updateItem = (collection: Collection) => (req: Request, res: Response) => {
  const { id } = req.params;
  const item = collections[collection].find(i => i.id === Number(id));
  if (!item) return res.status(404).json({ error: `${collection.slice(0, -1)} not found` });

  Object.assign(item, req.body);
  res.json(item);
};

export const deleteItem = (collection: Collection) => (req: Request, res: Response) => {
  const { id } = req.params;
  const index = collections[collection].findIndex(i => i.id === Number(id));
  if (index === -1) return res.status(404).json({ error: `${collection.slice(0, -1)} not found` });

  const deleted = collections[collection].splice(index, 1);
  res.json(deleted[0]);
};
