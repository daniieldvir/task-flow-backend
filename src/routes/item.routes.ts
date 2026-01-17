import { Router } from 'express';
import * as controller from '../controllers/item.controller';

const router = Router();

["tasks", "alerts", "incidents"].forEach(collection => {
    router.get(`/${collection}`, controller.getItems(collection as any));
  });

export default router;
