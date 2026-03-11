import { Router } from "express";

import { createOrder, getOrder } from "../controller/order.controller";

const router = Router();

router.get("/", getOrder);
router.post("/", createOrder);

export default router;
