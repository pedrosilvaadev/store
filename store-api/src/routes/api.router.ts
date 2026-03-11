import { Router } from "express";
import productRouter from "./product.router";
import orderRouter from "./order.router";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);

export default apiRouter;
