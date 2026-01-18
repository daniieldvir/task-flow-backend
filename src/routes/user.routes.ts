import { Router } from "express";
import * as controller from "../controllers/user.controller";

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);

export default router;
