import { Router } from 'express';
import * as controller from '../controllers/item.controller';


const router = Router();

["tasks", "alerts", "incidents"].forEach(collection => {
  router.get(`/${collection}`, controller.getItems(collection as any));
  router.post(`/${collection}`, controller.createItem(collection as any));
  router.put(`/${collection}/:id`, controller.updateItem(collection as any));
  router.delete(`/${collection}/:id`, controller.deleteItem(collection as any));
});

export default router;

