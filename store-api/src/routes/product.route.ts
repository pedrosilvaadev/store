import { Router } from "express";
import { getProducts } from "../controller/product.controller";

const router = Router();

router.get("/products", getProducts);

export default router;
